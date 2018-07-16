import * as gameActions from '../actions/GameActions';
import { ADD_PLAYERS, SCORE_UP, SET_RESULTS, RESET_GAME } from '../actions/types';

// ADD_PLAYERS action test
describe('actions', () => {
  it('Should create two new players.', () => {
    const players = [{ player1: 'Player 1 Test' }, { player2: 'Player 2 Test' }];

    const expectedAction = {
      type: ADD_PLAYERS,
      payload: {
        players
      }
    };

    expect(gameActions.addPlayersTest(players)).toEqual(expectedAction);
  })
});

// SCORE_UP action test
describe('actions', () => {
  it('Should add one more score to the current score of a player.', () => {
    const winnerPlayer = 'PlayerName';

    const expectedAction = {
      type: SCORE_UP,
      payload: {
        roundWinner: winnerPlayer
      }
    }

    expect(gameActions.scoreUpTest(winnerPlayer)).toEqual(expectedAction);
  })
});

// SET_RESULTS action test
describe('actions', () => {
  it('Should show the who wins and who loose the game.', () => {
    const gameResults = {
      winnerPlayer: { name: 'WinnerPlayerName', score: 3 },
      loserPlayer: { name: 'LoserPlayerName', score: 2 }
    };

    const expectedAction = {
      type: SET_RESULTS,
      payload: {
        gameResults: gameResults
      }
    };

    expect(gameActions.setGameResultsTest(gameResults)).toEqual(expectedAction);
  })
});

// RESET_GAME action test
describe('actions', () => {
  it('Should reset the game to the initial state', () => {
    const gameInitialState = {
      players: [],
      winner: ''
    };

    const expectedAction = {
      type: RESET_GAME,
      payload: {
        players: [],
        winner: ''
      }
    };

    expect(gameActions.resetGameTest()).toEqual(expectedAction);
  })
});