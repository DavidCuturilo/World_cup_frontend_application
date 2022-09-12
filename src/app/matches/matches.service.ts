import { GetPredictionsResponseModel } from './../models/response/get-predictions-response.model';
import { SavePredictionRequestModel } from './../models/request/save-prediction.request.model';
import { GetMatchesByRoundResponseDto } from './../models/response/get-matches-by-round.response.model';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { EnvService } from '../services/env/env.service';

@Injectable({
  providedIn: 'root',
})
export class MatchesService {
  constructor(private http: HttpClient, private injector: Injector) {}

  envService: EnvService = this.injector.get(EnvService);

  async getMatchesByRound(round: number | string, slugName: string) {
    return await lastValueFrom(
      this.http.get<GetMatchesByRoundResponseDto>(
        `${this.envService.apiURL}/world-cup/matchesByRound?round=${round}&slugName=${slugName}`
      )
    );
  }

  async savePrediction(prediction: SavePredictionRequestModel) {
    return await lastValueFrom(
      this.http.post(
        `${this.envService.apiURL}/webapp/savePrediction`,
        prediction
      )
    );
  }

  async getAllPredictions(user_id: number) {
    const response = await lastValueFrom(
      this.http.get<GetPredictionsResponseModel[]>(
        `${this.envService.apiURL}/webapp/allPredictions/${user_id}`
      )
    );
    return response;
  }

  async getPrediction(user_id: number, match_id: string) {
    const response = await lastValueFrom(
      this.http.get<GetPredictionsResponseModel>(
        `${this.envService.apiURL}/webapp/prediction?user_id=${user_id}&match_id=${match_id}`
      )
    );

    return response;
  }
}
