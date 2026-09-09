import {  type Dispatch } from 'react';
import type {
  PlayerFiltersAction,
  PlayerFiltersState,
} from '../reducers/playerFiltersReducer';

interface SearchProps {
  filtersState: PlayerFiltersState;
  dispatchFiltersAction: Dispatch<PlayerFiltersAction>;
  placeholder?: string;
}

function Search({
  filtersState,
  dispatchFiltersAction,
  placeholder = 'Search players...',
}: SearchProps) {
  return (
    <div className="search">
      <input
        type="text"
        className="search-input"
        value={filtersState.searchQuery}
        placeholder={placeholder}
        onChange={(event) =>
          dispatchFiltersAction({ type: 'SET_SEARCH_QUERY', searchQuery: event.target.value })
        }
      />
      {filtersState.searchQuery && (
        <button
          type="button"
          className="search-clear"
          onClick={() => dispatchFiltersAction({ type: 'SET_SEARCH_QUERY', searchQuery: '' })}
          aria-label="Clear search"
        >
          ×
        </button>
      )}
    </div>
  );
}

export default Search;
