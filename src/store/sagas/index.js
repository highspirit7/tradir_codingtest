import { all } from 'redux-saga/effects';
import { watchGetBeerList } from './beerlist';

function* rootSaga() {
	yield all([watchGetBeerList()]);
}

export default rootSaga;
