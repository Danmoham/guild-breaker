import { useEffect, useMemo, useReducer, useState } from 'react';
import { initialPlayers } from '../data/players';
import { playersActionReducer } from '../reducers/playersReducer';
import type { PlayerFiltersState } from '../reducers/playerFiltersReducer';
import { filterPlayers } from '../utils/filterPlayers';
import ItemRow from './ItemRow';

interface ItemsTableProps {
  filtersState: PlayerFiltersState;
}

function ItemsTable({ filtersState }: ItemsTableProps) {
  const [players, dispatchPlayersAction] = useReducer(playersActionReducer, initialPlayers);
  const [deletedPlayerName, setDeletedPlayerName] = useState<string | null>(null);

  const filteredPlayers = useMemo(
    () => filterPlayers(players, filtersState),
    [players,filtersState],
  );

  useEffect(() => {
    if (!deletedPlayerName) return;

    const timeoutId = window.setTimeout(() => setDeletedPlayerName(null), 3000);
    return () => window.clearTimeout(timeoutId);
  }, [deletedPlayerName]);

  return (
    <>
      {deletedPlayerName && (
        <div className="toast toast-success" role="status">
          {deletedPlayerName} has been deleted.
        </div>
      )}
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
                setDeletedPlayerName={setDeletedPlayerName}
              />
            ))
          )}
        </tbody>
      </table>
    </>
  );
}

export default ItemsTable;
