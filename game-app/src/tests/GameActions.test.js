import * as gameActions from '../actions/GameActions';
import * as moveActions from '../actions/MovesActions';
import { ADD_PLAYERS, SCORE_UP, SET_RESULTS, RESET_GAME, ADD_MOVE, UPDATE_MOVE } from '../actions/types';

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

// ADD_MOVE action test
describe('actions', () => {
  it('Should add a new move', () => {
    const move = { move: "test move", kills: "test kill" };

    const expectedAction = {
      type: ADD_MOVE,
      payload: {
        move: move
      }
    };

    expect(moveActions.addMoveTest(move)).toEqual(expectedAction);
  })
});

// UPDATE_MOVE action test
describe('actions', () => {
  it('Should add update an existing move', () => {
    const move = "existing_move";
    const kill = "new_kill";

    const expectedAction = {
      type: UPDATE_MOVE,
      payload: {
        move,
        kill
      }
    };

    expect(moveActions.updateMoveTest(move, kill)).toEqual(expectedAction);
  })
});