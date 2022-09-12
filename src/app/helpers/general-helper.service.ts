import { Injectable } from "@angular/core";
import { TransformFlag } from "../enums/transform-flag.enum";


@Injectable({ providedIn: 'root' })
export class GeneralHelper {

  public getDate(timestamp: number) {
    timestamp = timestamp * 1000;
    const date = new Date(timestamp + 1 * 3600 * 1000).toISOString().split('T');
    const day = date[0];
    return day;
  }

  public getTime(timestamp: number) {
    timestamp = timestamp * 1000;
    const date = new Date(timestamp + 1 * 3600 * 1000).toISOString().split('T');
    const time = date[1].replace(':00.000Z', '');
    return time;
  }

  public getImage(nameCode: string) {
    return '../../assets/flags/' + TransformFlag[nameCode];
  }

  public getRound(round: string) {
    const slugName = round.toLowerCase().replace(/ /g, '-');
    switch (round) {
      case 'Round 1':
      case 'Round 2':
      case 'Round 3':
        return {
          round: round.split(' ')[1],
          slugName: 'group-faze',
        };
      case 'Round of 16':
        return {
          round: 8,
          slugName,
        };
      case 'Quarterfinal':
        return {
          round: 4,
          slugName,
        };
      case 'Semifinal':
        return {
          round: 2,
          slugName,
        };
      case 'Final':
        return {
          round: 1,
          slugName,
        };
    }
  }

  public getMatchWinner(homeScore: number, awayScore: number) {
    if (homeScore === awayScore) {
      return 0;
    }
    if (homeScore > awayScore) {
      return 1;
    }
    return 2;
  }
}
