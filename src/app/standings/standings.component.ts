import { GeneralHelper } from './../helpers/general-helper.service';
import {
  GetStandingsResponseModel,
  StandingsInfo,
} from './model/response/get-standings.response.model';
import { lastValueFrom } from 'rxjs';
import { EnvService } from './../services/env/env.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Injector } from '@angular/core';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.scss'],
})
export class StandingsComponent implements OnInit {
  constructor(
    private readonly http: HttpClient,
    private readonly injector: Injector,
    private readonly generalHelper: GeneralHelper
  ) {}

  standings: StandingsInfo[];
  envService: EnvService = this.injector.get(EnvService);
  displayedColumns: string[] = [
    'position',
    'image',
    'team',
    'matches',
    'wins',
    'draws',
    'losses',
    'points',
  ];

  ngOnInit(): void {
    lastValueFrom(
      this.http.get<GetStandingsResponseModel>(
        `${this.envService.apiURL}/world-cup/standings`
      )
    )
      .then((data) => {
        this.standings = data.standings;
        console.log('Standings: ', this.standings);
      })
      .catch((error) => {
        console.log('Error ocurred while getting standings, error: ' + error);
      });
  }

  getImage(nameCode: string) {
    return this.generalHelper.getImage(nameCode);
  }
}
