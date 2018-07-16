import { ADD_PLAYERS, SCORE_UP, SET_RESULTS, RESET_GAME } from './types';

export const addPlayers = (players) => dispatch => {
    dispatch({
        type: ADD_PLAYERS,
        payload: {
            players: players
        }
    })
}

// ADD_PLAYER action for test
export const addPlayersTest = (players) => {
    return {
        type: ADD_PLAYERS,
        payload: {
            players
        }
    }
}

export const scoreUp = (player) => dispatch => {
    dispatch({
        type: SCORE_UP,
        payload: {
            roundWinner: player
        }
    })
}

// SCORE_UP action for test
export const scoreUpTest = (player) => {
    return {
        type: SCORE_UP,
        payload: {
            roundWinner: player
        }
    }
}

export const setGameResults = (playerResults) => dispatch => {
    dispatch({
        type: SET_RESULTS,
        payload: {
            gameResults: playerResults
        }
    })
}

// SET_RESULTS action for test
export const setGameResultsTest = (playerResults) => {
    return {
        type: SET_RESULTS,
        payload: {
            gameResults: playerResults
        }
    }
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

// RESET_GAME action for test
export const resetGameTest = () => {
    return {
        type: RESET_GAME,
        payload: {
            players: [],
            winner: ''
        }
    }
}