import * as moveActions from '../actions/MovesActions';
import { ADD_MOVE, UPDATE_MOVE } from '../actions/types';

describe('actions', () => {
  // ADD_MOVE action test
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
  // UPDATE_MOVE action test
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
  });
});
