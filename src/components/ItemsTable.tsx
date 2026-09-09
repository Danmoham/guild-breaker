import type { Dispatch } from 'react';
import type { Player } from '../types';
import type { PlayersAction } from '../reducers/playersReducer';
import ItemRow from './ItemRow';

interface ItemsTableProps {
  players: Player[];
  dispatchPlayersAction: Dispatch<PlayersAction>;
}

function ItemsTable({ players, dispatchPlayersAction }: ItemsTableProps) {
  return (
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
        {players.length === 0 ? (
          <tr>
            <td colSpan={5} className="empty-state">
              No players found.
            </td>
          </tr>
        ) : (
          players.map((currentPlayer) => (
            <ItemRow
              key={currentPlayer.id}
              player={currentPlayer}
              dispatchPlayersAction={dispatchPlayersAction}
            />
          ))
        )}
      </tbody>
    </table>
  );
}

export default ItemsTable;
