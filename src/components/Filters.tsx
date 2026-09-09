import {  type Dispatch } from 'react';
import type {
  PlayerFiltersAction,
  PlayerFiltersState,
} from '../reducers/playerFiltersReducer';
import {
  availableNationalities,
  availableBestPositions,
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
        <span className="filter-label">Best Position</span>
        <select
          className="filter-select"
          value={filtersState.selectedBestPosition}
          onChange={(event) =>
            dispatchFiltersAction({
              type: 'SET_SELECTED_BEST_POSITION',
              selectedBestPosition: event.target.value,
            })
          }
        >
          <option value="">All</option>
          {availableBestPositions.map((bestPositionOption) => (
            <option key={bestPositionOption} value={bestPositionOption}>
              {bestPositionOption}
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
    </div>
  );
}

export default Filters
