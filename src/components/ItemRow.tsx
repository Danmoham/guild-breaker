import { memo, useState, type Dispatch } from 'react';
import type { Player } from '../types';
import type { PlayersAction } from '../reducers/playersReducer';

interface ItemRowProps {
  player: Player;
  dispatchPlayersAction: Dispatch<PlayersAction>;
}

function ItemRow({ player, dispatchPlayersAction }: ItemRowProps) {

  const [note, setNote] = useState('');

  return (
    <tr className="item-row">
      <td>{player.name}</td>
      <td>{player.nationality}</td>
      <td>
        <select
          className="rating-select"
          value={player.rating}
          aria-label={`Rating for ${player.name}`}
          onChange={(event) =>
            dispatchPlayersAction({
              type: 'UPDATE_PLAYER_RATING',
              playerIdToUpdate: player.id,
              updatedRating: Number(event.target.value),
            })
          }
        >
          {Array.from({ length: 10 }, (_unused, index) => index + 1).map((ratingOption) => (
            <option key={ratingOption} value={ratingOption}>
              {ratingOption}/10
            </option>
          ))}
        </select>
      </td>
      <td>
        <input
          type="text"
          className="note-input"
          placeholder="Add a note..."
          value={note}
          onChange={(event) => setNote(event.target.value)}
          aria-label={`Note for ${player.name}`}
        />
      </td>
      <td className="actions-cell">
        <button
          type="button"
          className="btn btn-delete"
          onClick={() =>
            dispatchPlayersAction({ type: 'DELETE_PLAYER', playerIdToDelete: player.id })
          }
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

/**
 * Memoized so that updating or deleting one player only re-renders that
 * player's row instead of every row in the table. Safe because `player`
 * keeps a stable reference for unaffected rows (see playersReducer) and
 * `dispatchPlayersAction` is a stable function returned by useReducer.
 */
export default memo(ItemRow);

