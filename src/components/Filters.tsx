import {  type Dispatch } from 'react';
import {
  hasActiveFilters,
  type PlayerFiltersAction,
  type PlayerFiltersState,
} from '../reducers/playerFiltersReducer';
import {
  availableNationalities,
  availableMinimumRatingOptions,
} from '../data/filterOptions';

interface FiltersProps {
  filtersState: PlayerFiltersState;
  dispatchFiltersAction: Dispatch<PlayerFiltersAction>;
}

function Filters({ filtersState, dispatchFiltersAction }: FiltersProps) {
  return (
    <div className="filters">
      <label className="filter-field">
        <span className="filter-label">Nationality</span>
        <select
          className="filter-select"
          value={filtersState.selectedNationality}
          onChange={(event) =>
            dispatchFiltersAction({
              type: 'SET_SELECTED_NATIONALITY',
              selectedNationality: event.target.value,
            })
          }
        >
          <option value="">All</option>
          {availableNationalities.map((nationalityOption) => (
            <option key={nationalityOption} value={nationalityOption}>
              {nationalityOption}
            </option>
          ))}
        </select>
      </label>

      <label className="filter-field">
        <span className="filter-label">Min Rating</span>
        <select
          className="filter-select"
          value={filtersState.selectedMinimumRating}
          onChange={(event) =>
            dispatchFiltersAction({
              type: 'SET_SELECTED_MINIMUM_RATING',
              selectedMinimumRating: Number(event.target.value),
            })
          }
        >
          <option value={0}>Any</option>
          {availableMinimumRatingOptions.map((minimumRatingOption) => (
            <option key={minimumRatingOption} value={minimumRatingOption}>
              {minimumRatingOption}+
            </option>
          ))}
        </select>
      </label>

      {hasActiveFilters(filtersState) && (
        <button
          type="button"
          className="btn btn-reset-filters"
          onClick={() => dispatchFiltersAction({ type: 'RESET_FILTERS' })}
        >
          Reset filters
        </button>
      )}
    </div>
  );
}

export default Filters
