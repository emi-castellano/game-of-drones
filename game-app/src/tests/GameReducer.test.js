import gameReducer from '../reducers/GameReducer';
import { ADD_PLAYERS, SCORE_UP } from '../actions/types';

describe('GameReducer test', () => {
    // Test the initial state
    it('Should return the initial state.', () => {
        expect(gameReducer(undefined, {})).toEqual({
            players: [],
            results: {}
        })
    });

    // Test ADD_PLAYERS case
    it('Should handle ADD_PLAYERS', () => {
        expect(
            gameReducer([], {
                type: ADD_PLAYERS,
                payload: {
                    players: ['Player1Name', 'Player2Name']
                }
            })
        ).toEqual({
            players: [
                {
                    name: 'Player1Name',
                    score: 0
                },
                {
                    name: 'Player2Name',
                    score: 0
                },
            ],
        })
    });

    // Test SCORE_UP case
    it('Should handle SCORE_UP', () => {
        const state = {
            players: [
                {
                    name: 'Player1Name',
                    score: 0
                },
                {
                    name: 'Player2Name',
                    score: 0
                },
            ]
        };
        expect(
            gameReducer(state, {
                type: SCORE_UP,
                payload: {
                    roundWinner: 'Player1Name'
                }
            })
        ).toEqual({
            players: [
                {
                    name: 'Player1Name',
                    score: 1
                },
                {
                    name: 'Player2Name',
                    score: 0
                },
            ],
        })
    });
})