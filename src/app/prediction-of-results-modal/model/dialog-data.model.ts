import { MatchStatus } from "src/app/enums/match-status.enum";

export interface DialogDataModel {
  id: string;
  homeTeam: string;
  homeNameCode: string;
  homeScore: number;
  awayTeam: string;
  awayNameCode: string;
  awayScore: number;
  isStarted: boolean;
  startingDate: string;
  startingTime: string;
  status: MatchStatus;
}
