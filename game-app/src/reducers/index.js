import { combineReducers } from 'redux';
import gameReducer from './GameReducer';
import movesReducer from './MovesReducer';

export default combineReducers({
    gameState: gameReducer,
    moveState: movesReducer
});