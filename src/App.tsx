import { useReducer } from 'react';
import './index.css';
import ItemsTable from './components/ItemsTable';
import Search from './components/Search';
import Filters from './components/Filters';
import CountdownTimer from './components/CountdownTimer';
import {
  initialPlayerFiltersState,
  playerFiltersReducer,
} from './reducers/playerFiltersReducer';

function App() {
  const [filtersState, dispatchFiltersAction] = useReducer(
    playerFiltersReducer,
    initialPlayerFiltersState,
  );

  return (
    <div className="app">
      <h1 className="app-title">The worlds most accurate football player database, except I don't search</h1>
      <CountdownTimer />
      <div className="toolbar">
        <Search filtersState={filtersState} dispatchFiltersAction={dispatchFiltersAction} />
        <Filters filtersState={filtersState} dispatchFiltersAction={dispatchFiltersAction} />
      </div>
      <div className="table-wrapper">
        <ItemsTable filtersState={filtersState} />
      </div>
    </div>
  );
}

export default App;
