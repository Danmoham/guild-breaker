import { useMemo, useReducer } from 'react';
import './index.css';
import ItemsTable from './components/ItemsTable';
import Search from './components/Search';
import Filters from './components/Filters';
import { initialPlayers } from './data/players';
import { playersReducer } from './reducers/playersReducer';
import {
  initialPlayerFiltersState,
  playerFiltersReducer,
} from './reducers/playerFiltersReducer';
import { filterPlayers } from './utils/filterPlayers';

function App() {
  const [players, dispatchPlayersAction] = useReducer(playersReducer, initialPlayers);
  const [filtersState, dispatchFiltersAction] = useReducer(
    playerFiltersReducer,
    initialPlayerFiltersState,
  );

  const filteredPlayers = useMemo(
    () => filterPlayers(players, filtersState),
    [players, filtersState],
  );

  return (
    <div className="app">
      <h1 className="app-title">Guild Breaker</h1>
      <div className="toolbar">
        <Search filtersState={filtersState} dispatchFiltersAction={dispatchFiltersAction} />
        <Filters filtersState={filtersState} dispatchFiltersAction={dispatchFiltersAction} />
      </div>
      <div className="table-wrapper">
        <ItemsTable players={filteredPlayers} dispatchPlayersAction={dispatchPlayersAction} />
      </div>
    </div>
  );
}

export default App;
