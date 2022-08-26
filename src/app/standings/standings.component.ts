import { TransformFlag } from './../enums/transform-flag.enum';
import { GetStandingsResponseDto, StandingsInfo } from './../../../../world_cup_backend/src/services/world-cup/dto/get-standings.response.dto';
import { EnvService } from './../services/env/env.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Injector } from '@angular/core';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.scss'],
})
export class StandingsComponent implements OnInit {
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
  nameCode = '../../assets/flags/argentina.png'

  getImage(nameCode: string){
    return '../../assets/flags/'+TransformFlag[nameCode];
  }

  constructor(
    private readonly http: HttpClient,
    private readonly injector: Injector
  ) {}

  ngOnInit(): void {
    this.http
      .get<GetStandingsResponseDto>(
        `${this.envService.apiURL}/world-cup/standings`
      )
      .subscribe((data) => {
        this.standings = data.standings;

        console.log('Standings: ', this.standings);
      });
  }
}
