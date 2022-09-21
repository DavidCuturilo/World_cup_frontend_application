import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { EnvService } from '../services/env/env.service';
import { GetStandingsResponseModel } from './model/response/get-standings.response.model';

@Injectable({
  providedIn: 'root',
})
export class StandingsService {
  constructor(private http: HttpClient, private injector: Injector) {}
  envService: EnvService = this.injector.get(EnvService);

  async getStandings() {
    return await lastValueFrom(
      this.http.get<GetStandingsResponseModel>(
        `${this.envService.apiURL}/world-cup/standings`
      )
    );
  }
}
