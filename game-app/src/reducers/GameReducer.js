import { ADD_PLAYERS, SCORE_UP, SET_WINNER, RESET_GAME } from '../actions/types';

const initialState = {
  players: [],
  winner: ''
}

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_PLAYERS:
      const players = action.payload.players.map(player => ({ name: player, score: 0 }));
      return { ...state, players }
    case SCORE_UP:
      const winner = action.payload.roundWinner;
      const gamePlayers = state.players.map(player => {
        if (player.name === winner) {
          return { name: player.name, score: player.score + 1 } 
        }
        return { ...player }
      });
      return { ...state, players: gamePlayers }
    case SET_WINNER:
      return { ...state, winner: action.payload.gameWinner }
    case RESET_GAME:
      return initialState;
    default:
      return state;
  }
}