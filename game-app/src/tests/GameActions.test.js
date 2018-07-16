import * as gameActions from '../actions/GameActions';
import MoveActions from '../actions/MovesActions';
import { ADD_PLAYERS, SCORE_UP, SET_RESULTS, RESET_GAME } from '../actions/types';

describe('actions', () => {
  it('Should create two new players.', () => {
    const players = [{ player1: 'Player 1 Test', player2: 'Player 2 Test' }]
    const expectedAction = {
      type: ADD_PLAYERS,
      players
    }
    
    expect(gameActions.addPlayers(players)).toEqual(expectedAction)
  })
})