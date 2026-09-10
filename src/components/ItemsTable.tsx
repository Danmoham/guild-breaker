/* eslint-disable react-hooks/exhaustive-deps */
import {  useMemo, useReducer } from 'react';
import { initialPlayers } from '../data/players';
import { playersReducer } from '../reducers/playersReducer';
import type { PlayerFiltersState } from '../reducers/playerFiltersReducer';
import { filterPlayers } from '../utils/filterPlayers';
import ItemRow from './ItemRow';

interface ItemsTableProps {
  filtersState: PlayerFiltersState;
}

function ItemsTable({ filtersState }: ItemsTableProps) {
  const [players, dispatchPlayersAction] = useReducer(playersReducer, initialPlayers);

  // Bug: missing dependency. `filtersState` is used inside the memoized function
  const filteredPlayers = useMemo(
    () => filterPlayers(players, filtersState),
    [players],
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
            filteredPlayers.map((currentPlayer, index) => (
              <ItemRow
              // Bug: key issue
                key={index}
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
