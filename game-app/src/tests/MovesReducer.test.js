import movesReducer from '../reducers/MovesReducer';
import { ADD_MOVE, UPDATE_MOVE } from '../actions/types';

describe('GameReducer test', () => {
    // Test the initial state
    it('Should return the initial state.', () => {
        expect(movesReducer(undefined, {})).toEqual({
            moves: [
                { move: "paper", kills: "rock" },
                { move: "rock", kills: "scissors" },
                { move: "scissors", kills: "paper" }
            ]
        })
    });

    // Test ADD_MOVE case
    it('Should handle ADD_MOVE', () => {
        const state = {
            moves: [
                { move: "paper", kills: "rock" },
                { move: "rock", kills: "scissors" },
                { move: "scissors", kills: "paper" }
            ]
        };
        expect(
            movesReducer(state, {
                type: ADD_MOVE,
                payload: { move: { move: "dog", kills: "paper" } }
            })
        ).toEqual({
            moves: [
                { move: "paper", kills: "rock" },
                { move: "rock", kills: "scissors" },
                { move: "scissors", kills: "paper" },
                { move: "dog", kills: "paper" }
            ]
        })
    });

    // Test UPDATE_MOVE case
    it('Should handle UPDATE_MOVE', () => {
        const state = {
            moves: [
                { move: "paper", kills: "rock" },
                { move: "rock", kills: "scissors" },
                { move: "scissors", kills: "paper" }
            ]
        };
        expect(
            movesReducer(state, {
                type: UPDATE_MOVE,
                payload: { move: "paper", kills: "dog" }
            })
        ).toEqual({
            moves: [
                { move: "paper", kills: "dog" },
                { move: "rock", kills: "scissors" },
                { move: "scissors", kills: "paper" }
            ]
        })
    });
})