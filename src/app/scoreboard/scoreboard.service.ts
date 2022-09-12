import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { EnvService } from '../services/env/env.service';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class ScoreboardService {
  constructor(private http: HttpClient, private injector: Injector) {}
  envService: EnvService = this.injector.get(EnvService);

  async getUsers() {
    return await lastValueFrom(
      this.http.get<UserModel[]>(`${this.envService.apiURL}/webapp/users`)
    );
  }
}
