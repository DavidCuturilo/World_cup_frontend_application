import { TransformFlag } from './../enums/transform-flag.enum';
import { MatchesInfo } from './../models/response/get-matches-by-round.response.model';
import { GetMatchesByRoundResponseDto } from './../../../../world_cup_backend/src/services/world-cup/dto/get-matches-by-round.response.dto';
import { EnvService } from './../services/env/env.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Injector } from '@angular/core';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss'],
})
export class MatchesComponent implements OnInit {
  constructor(
    private readonly http: HttpClient,
    private readonly injector: Injector
  ) {}

  envService: EnvService = this.injector.get(EnvService);
  events: MatchesInfo[];
  round: number = 1;
  slugName = 'group-faze'
  rounds = [
    { value: 'Round 1' },
    { value: 'Round 2' },
    { value: 'Round 3' },
    { value: 'Round of 16' },
    { value: 'Quarterfinal' },
    { value: 'Semifinal' },
    { value: 'Final' },
  ];

  selected = 'Round 1';

  ngOnInit(): void {
    this.http
      .get<GetMatchesByRoundResponseDto>(
        `${this.envService.apiURL}/world-cup/matchesByRound?round=${this.round}&slugName=${this.slugName}`
      )
      .subscribe(
        (data) => {
          this.events = data.events;
          console.log('Events: ' + this.events);
        },
        (error) => {
          console.log('Error getting matches by round: ' + this.round);
        }
      );
  }

  getDate(timestamp: number) {
    timestamp = timestamp * 1000;
    const date = new Date(timestamp + 1 * 3600 * 1000).toISOString().split('T');
    const day = date[0];
    return day;
  }

  getTime(timestamp: number) {
    timestamp = timestamp * 1000;
    const date = new Date(timestamp + 1 * 3600 * 1000).toISOString().split('T');
    const time = date[1].replace(':00.000Z', '');
    return time;
  }

  getImage(nameCode: string) {
    return '../../assets/flags/' + TransformFlag[nameCode];
  }

  getMatchesByRound(round: string) {
    const selectedRound = this.getRound(round);
    console.log('Selected round: '+selectedRound);
    this.http
    .get<GetMatchesByRoundResponseDto>(
      `${this.envService.apiURL}/world-cup/matchesByRound?round=${selectedRound.round}&slugName=${selectedRound.slugName}`
    )
    .subscribe(
      (data) => {
        this.events = data.events;
        console.log('Events: ' + this.events);
      },
      (error) => {
        console.log('Error getting matches by round: ' + selectedRound);
      }
    );
  }

  getRound(round: string) {
    const slugName = round.toLowerCase().replace(/ /g,'-');
    switch(round) {
      case 'Round 1':
      case 'Round 2':
      case 'Round 3':
        return {
          round: round.split(' ')[1],
          slugName: 'group-faze'
        }
      case 'Round of 16':
        return {
          round: 8,
          slugName
        }
      case 'Quarterfinal':
        return {
          round: 4,
          slugName
        }
      case 'Semifinal':
        return {
          round: 2,
          slugName
        }
      case 'Final':
        return {
          round: 1,
          slugName
        }
    }
  }
}
