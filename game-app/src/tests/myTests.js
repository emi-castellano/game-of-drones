import GameActions from '../actions/GameActions';
import MoveActions from '../actions/MovesActions';
import { ADD_PLAYERS, SCORE_UP, SET_RESULTS, RESET_GAME } from '../actions/types';

describe('actions', () => {
  it('Should create two new players.', () => {
    const text = 'Finish docs'
    const expectedAction = {
      type: types.ADD_TODO,
      text
    }
    expect(actions.addTodo(text)).toEqual(expectedAction)
  })
})