import { ADD_MOVE, UPDATE_MOVE } from '../actions/types';

export const updateMove = (move, kill) => dispatch => {
    dispatch({
        type: UPDATE_MOVE,
        payload: {
            move,
            kill
        }
    })
}

export const addMove = (move) => dispatch => {
    dispatch({
        type: ADD_MOVE,
        payload: {
            move: move
        }
    })
}