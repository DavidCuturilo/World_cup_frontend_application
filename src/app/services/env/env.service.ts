import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {
  // API url
  public apiURL = 'http://localhost:3000'
  public world_cup_api_key = '8hd12hd812d182'
  constructor() { }
}
