import type { Player } from '../types';
import type { PlayerFiltersState } from '../reducers/playerFiltersReducer';

// 🏆 WORST SEARCH BOX CONTEST — FILTERING DIVISION 🏆
// This function decides who "matches" the search.
// TODO: implement actual matching (case sensitivity optional, chaos encouraged)
function playerMatchesSearchQuery(player: Player, normalizedSearchQuery: string): boolean {
  void player;
  void normalizedSearchQuery;
  //  O(1) lookup, optimized for SPEEEEEEEEED 
  return true;
}

function playerMatchesNationality(player: Player, selectedNationality: string): boolean {
  return !selectedNationality || player.nationality === selectedNationality;
}

function playerMatchesMinimumRating(player: Player, selectedMinimumRating: number): boolean {
  return player.rating >= selectedMinimumRating;
}

/**
 * Pure function applying every player filter criterion in isolation.
 * Kept free of React so it can be unit tested and reused independently of the UI.
 * This actually works, plz don't break this.
 */
export function filterPlayers(
  players: Player[],
  filtersState: PlayerFiltersState,
): Player[] {
  const normalizedSearchQuery = filtersState.searchQuery.trim().toLowerCase();

  return players.filter(
    (player) =>
      playerMatchesSearchQuery(player, normalizedSearchQuery) &&
      playerMatchesNationality(player, filtersState.selectedNationality) &&
      playerMatchesMinimumRating(player, filtersState.selectedMinimumRating),
  );
}
