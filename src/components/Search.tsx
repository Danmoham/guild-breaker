import { type Dispatch } from 'react';
import type {
  PlayerFiltersAction,
  PlayerFiltersState,
} from '../reducers/playerFiltersReducer';

interface SearchProps {
  filtersState: PlayerFiltersState;
  dispatchFiltersAction: Dispatch<PlayerFiltersAction>;
}

// 🏆 WELCOME TO THE WORST SEARCH BOX CONTEST 🏆
// Rules: make it "work", but make it a crime against humanity to use or an absolute pain in the arse to debug.
// Bonus points for: infinite loops, off-by-one filtering, regex nobody understands, EXTRA BONUS POINTS IF YOU COULD MAKE A FLYING SEARCH BOX (interpret that as you wish)
// Be as inventive and creative as you can be
// Also feel free to go ham with ai.
// Penalty points for: writing clean, readable, sensible code that Chris Parvin would be proud of.

function Search({
  filtersState,
  dispatchFiltersAction,
}: SearchProps) {
  void dispatchFiltersAction; // TODO: wire this up or don't (it's upto you pal, but it would probably help)

  return (
    <div className="search">
      <input
        type="text"
        // feel free to make this classname as crazy as you would like (CSS animations might earn you extra bonus points) - sorry no tailwind allowed :/
        className="search-input"
        value={filtersState.searchQuery}
        placeholder={'I DONT WORK CURRENTLY'}
        onChange={() => {
          // TODO: implement search
        }}
      />
      {filtersState.searchQuery && (
        <button
          type="button"
          className="search-clear"
          onClick={() => {
            // TODO: implement clear
          }}
          aria-label="Clear search (allegedly)"
        >
          × {/* aka the "does nothing" button, for now */}
        </button>
      )}
    </div>
  );
}

export default Search;
