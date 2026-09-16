import {  useMemo, useReducer } from 'react';
import { initialPlayers } from '../data/players';
import { playersActionReducer } from '../reducers/playersReducer';
import { hasActiveFilters, type PlayerFiltersState } from '../reducers/playerFiltersReducer';
import { filterPlayers } from '../utils/filterPlayers';
import ItemRow from './ItemRow';

interface ItemsTableProps {
  filtersState: PlayerFiltersState;
}

function ItemsTable({ filtersState }: ItemsTableProps) {
  const [players, dispatchPlayersAction] = useReducer(playersActionReducer, initialPlayers);

  const filteredPlayers = useMemo(
    () => hasActiveFilters(filtersState) ? filterPlayers(players, filtersState) : players,   
    [players,filtersState]
  );

  return (
    <>
 
      <table className="items-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Nationality</th>
            <th>Best Position</th>
            <th>Rating</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPlayers.length === 0 ? (
            <tr>
              <td colSpan={5} className="empty-state">
                No players found.
              </td>
            </tr>
          ) : (
            filteredPlayers.map((currentPlayer) => (
              <ItemRow
                key={currentPlayer.id}
                player={currentPlayer}
                dispatchPlayersAction={dispatchPlayersAction}
              />
            ))
          )}
        </tbody>
      </table>
    </>
  );
}

export default ItemsTable;
