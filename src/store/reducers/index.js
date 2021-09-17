import { combineReducers } from 'redux';
import beerlistReducer from './beerlist';

const rootReducer = combineReducers({
	beerlistReducer,
});

export default rootReducer;
