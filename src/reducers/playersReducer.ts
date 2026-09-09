import type { Player } from '../types';

export type PlayersAction =
  | { type: 'ADD_PLAYER'; player: Player }
  | { type: 'DELETE_PLAYER'; playerIdToDelete: string }
  | { type: 'UPDATE_PLAYER_RATING'; playerIdToUpdate: string; updatedRating: number }
  | { type: 'UPDATE_PLAYER_NOTE'; playerIdToUpdate: string; updatedNote: string };

export function playersReducer(currentPlayers: Player[], playersAction: PlayersAction): Player[] {
  switch (playersAction.type) {
 
    case 'DELETE_PLAYER':
      return currentPlayers.filter((player) => player.id !== playersAction.playerIdToDelete);
    case 'UPDATE_PLAYER_RATING':
      return currentPlayers.map((player) =>
        player.id === playersAction.playerIdToUpdate
          ? { ...player, rating: playersAction.updatedRating }
          : player,
      );
    case 'UPDATE_PLAYER_NOTE':
      return currentPlayers.map((player) =>
        player.id === playersAction.playerIdToUpdate
          ? { ...player, note: playersAction.updatedNote }
          : player,
      );
    default:
      return currentPlayers;
  }
}
