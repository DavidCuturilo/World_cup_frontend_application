export interface SavePredictionRequestModel {
  homeScore: number;
  awayScore: number;
  winnerCode: number;
  user: {
    id: number;
  };
  match: {
    id: string;
  };
}
