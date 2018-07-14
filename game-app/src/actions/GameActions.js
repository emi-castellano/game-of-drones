import { ADD_PLAYERS, SCORE_UP, SET_RESULTS, RESET_GAME } from './types';

export const addPlayers = (players) => dispatch => {
    dispatch({
        type: ADD_PLAYERS,
        payload: {
            players: players
        }
    })
}

export const scoreUp = (player) => dispatch => {
    dispatch({
        type: SCORE_UP,
        payload: {
            roundWinner: player
        }
    })
}

export const setGameResults = (playerResults) => dispatch => {
    dispatch({
        type: SET_RESULTS,
        payload: {
            gameResults: playerResults
        }
    })
}

export const resetGame = () => dispatch => {
    dispatch({
        type: RESET_GAME,
        payload: {
            players: [],
            winner: ''
        }
    })
}