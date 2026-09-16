export interface PlayerFiltersState {
  searchQuery: string;
  selectedNationality: string;
  selectedBestPosition: string;
  selectedMinimumRating: number;
}

export const initialPlayerFiltersState: PlayerFiltersState = {
  searchQuery: '',
  selectedNationality: '',
  selectedBestPosition: '',
  selectedMinimumRating: 0,
};

/**
 * Derives whether any filter is currently active, rather than storing it as
 * separate state (which would risk getting out of sync with the individual
 * filter fields).
 */
export function hasActiveFilters(filtersState: PlayerFiltersState): boolean {
  return (
    filtersState.searchQuery.trim() !== '' ||
    filtersState.selectedNationality !== '' ||
    filtersState.selectedBestPosition !== '' ||
    filtersState.selectedMinimumRating !== 0
  );
}

export type PlayerFiltersAction =
  | { type: 'SET_SEARCH_QUERY'; searchQuery: string }
  | { type: 'SET_SELECTED_NATIONALITY'; selectedNationality: string }
  | { type: 'SET_SELECTED_BEST_POSITION'; selectedBestPosition: string }
  | { type: 'SET_SELECTED_MINIMUM_RATING'; selectedMinimumRating: number }
  | { type: 'RESET_FILTERS' };

export function playerFiltersReducer(
  currentFiltersState: PlayerFiltersState,
  filtersAction: PlayerFiltersAction,
): PlayerFiltersState {
  // done this automatically to h
  switch (filtersAction.type) {
    // 🏆 WORST SEARCH BOX CONTEST — REDUCER DIVISION 🏆
    // TODO: actually update searchQuery
    // spoiler: state currently refuses to change
    case 'SET_SEARCH_QUERY':
      void filtersAction.searchQuery;
      return currentFiltersState;
    case 'SET_SELECTED_NATIONALITY':
      return {
        ...currentFiltersState,
        selectedNationality: filtersAction.selectedNationality,
      };
    case 'SET_SELECTED_BEST_POSITION':
      return {
        ...currentFiltersState,
        selectedBestPosition: filtersAction.selectedBestPosition,
      };
    case 'SET_SELECTED_MINIMUM_RATING':
      return {
        ...currentFiltersState,
        selectedMinimumRating: filtersAction.selectedMinimumRating,
      };
    case 'RESET_FILTERS':
      return initialPlayerFiltersState;
    default:
      return currentFiltersState;
  }
}
