export interface PlayerStats {
  displayName: string;
  kills: number;
  deaths: number;
}

export const kdForStats = (stats: PlayerStats, precision: number): number => {
  return (stats.kills / stats.deaths).toFixed(precision)
} 

export interface StatsResponse {
  count: number;
  results: PlayerStats[];
}
