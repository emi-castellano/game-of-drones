import { ADD_MOVE, UPDATE_MOVE } from '../actions/types';

const initialState = {
    moves: [
        { move: "paper", kills: "rock" },
        { move: "rock", kills: "scissors" },
        { move: "scissors", kills: "paper" }
    ]
}

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_MOVE:
            return {
                moves: [...state.moves, action.payload.move]
            }
            break;
        case UPDATE_MOVE:
            const { move, kill } = action.payload;
            const moves = state.moves.map(moveItem => {
                if (moveItem.move === move) {
                    return { move, kill }
                }
                return { ...moveItem }
            });

            return { ...state, moves }
            break;
        default:
            return state;
            break;
    }
}