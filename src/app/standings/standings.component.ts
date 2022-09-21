import { GeneralHelper } from './../helpers/general-helper.service';
import { StandingsInfo } from './model/response/get-standings.response.model';
import { EnvService } from './../services/env/env.service';
import { Component, OnInit, Injector } from '@angular/core';
import { StandingsService } from './standings.service';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.scss'],
})
export class StandingsComponent implements OnInit {
  constructor(
    private readonly injector: Injector,
    private readonly generalHelper: GeneralHelper,
    private readonly standingsService: StandingsService
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

  async ngOnInit(): Promise<void> {
    try {
      const response = await this.standingsService.getStandings();
      this.standings = response.standings;
    } catch (error) {
      console.log('Error getting standings, error: ' + error);
    }
  }

  getImage(nameCode: string) {
    return this.generalHelper.getImage(nameCode);
  }
}
