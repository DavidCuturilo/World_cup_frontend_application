import { SavePredictionRequestModel } from './../models/request/save-prediction.request.model';
import { DialogDataModel } from './../prediction-of-results-modal/model/dialog-data.model';
import { MatchesService } from './matches.service';
import { PredictionOfResultsModalComponent } from './../prediction-of-results-modal/prediction-of-results-modal.component';
import { MatchesInfo } from './../models/response/get-matches-by-round.response.model';
import { EnvService } from './../services/env/env.service';
import { Component, OnInit, Injector } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatchStatus } from '../enums/match-status.enum';
import jwt_decode from 'jwt-decode';
import { AuthService } from '../auth/auth.service';
import { GeneralHelper } from '../helpers/general-helper.service';
import { GetPredictionsResponseModel } from '../models/response/get-predictions-response.model';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss'],
})
export class MatchesComponent implements OnInit {
  constructor(
    private readonly injector: Injector,
    public dialog: MatDialog,
    private authService: AuthService,
    private matchService: MatchesService,
    private generalHelper: GeneralHelper
  ) {}

  envService: EnvService = this.injector.get(EnvService);
  events: MatchesInfo[];
  round: number = 1;
  selected = 'Round 1';
  slugName = 'group-faze';
  rounds = [
    { value: 'Round 1' },
    { value: 'Round 2' },
    { value: 'Round 3' },
    { value: 'Round of 16' },
    { value: 'Quarterfinal' },
    { value: 'Semifinal' },
    { value: 'Final' },
  ];
  dialogData: DialogDataModel;
  dialogResponseData: DialogDataModel;
  userId: number;
  jwtToken;
  allPredictions: GetPredictionsResponseModel[];

  async ngOnInit(): Promise<void> {
    try {
      let matches = await this.matchService.getMatchesByRound(
        this.round,
        this.slugName
      );
      this.events = matches.events;
    } catch (error) {
      console.log('Error getting matches by round: ' + this.round);
    }
    this.jwtToken = jwt_decode(this.authService.getToken());
    this.userId = this.jwtToken?.sub;

    try {
      this.allPredictions = await this.matchService.getAllPredictions(
        this.userId
      );
    } catch (error) {
      console.log('Error while getting all predictions, error: ' + error);
    }
  }

  getDate(timestamp: number) {
    return this.generalHelper.getDate(timestamp);
  }

  getTime(timestamp: number) {
    return this.generalHelper.getTime(timestamp);
  }

  getImage(nameCode: string) {
    return this.generalHelper.getImage(nameCode);
  }

  async getMatchesByRound(round: string) {
    const selectedRound = this.getRound(round);
    try {
      let matches = await this.matchService.getMatchesByRound(
        selectedRound.round,
        selectedRound.slugName
      );
      this.events = matches.events;
    } catch (error) {
      console.log('Error getting matches by round: ' + this.round);
    }
  }

  getRound(round: string) {
    return this.generalHelper.getRound(round);
  }

  showMatchResult(match: MatchesInfo) {
    return match.status.description != MatchStatus.NOT_STARTED;
  }

  matchStarted(match: MatchesInfo) {
    return match.status.description != MatchStatus.NOT_STARTED
      ? 'started'
      : 'group';
  }

  enteredPrediction(match: MatchesInfo) {
    const exist = this.allPredictions?.find(
      (prediction) => prediction.match.id === match.customId
    );
    return exist != undefined;
  }

  async openDialog(match: MatchesInfo) {
    const prediction = await this.matchService.getPrediction(
      this.userId,
      match.customId
    );

    this.dialogData = {
      customId: match.customId,
      homeTeam: match.homeTeam.name,
      homeNameCode: match.homeTeam.nameCode,
      homeScore: prediction?.homeScore,
      awayTeam: match.awayTeam.name,
      awayNameCode: match.awayTeam.nameCode,
      awayScore: prediction?.awayScore,
      isStarted:
        match.status.description === MatchStatus.NOT_STARTED ? false : true,
      startingDate: this.getDate(match.startTimestamp),
      startingTime: this.getTime(match.startTimestamp),
      status: match.status.description as MatchStatus,
    };
    const dialogRef = this.dialog.open(PredictionOfResultsModalComponent, {
      width: '30%',
      height: '30%',
      data: this.dialogData,
    });

    dialogRef.afterClosed().subscribe((result: DialogDataModel) => {
      this.dialogResponseData = result;
      if (
        this.dialogResponseData &&
        (this.dialogResponseData.homeScore || this.dialogResponseData.awayScore)
      ) {
        const homeScore = this.dialogResponseData.homeScore ?? 0;
        const awayScore = this.dialogResponseData.awayScore ?? 0;
        let prediction: SavePredictionRequestModel = {
          homeScore,
          awayScore,
          winnerCode: this.generalHelper.getMatchWinner(
            this.dialogResponseData?.homeScore,
            this.dialogResponseData.awayScore
          ),
          user: { id: this.userId },
          match: { id: result.customId },
        };
        this.matchService.savePrediction(prediction);
        this.ngOnInit();
      }
    });
  }
}
