import { combineReducers } from 'redux';
import beerlist from './beerlist';

const rootReducer = combineReducers({
	beerlist,
});

export default rootReducer;
