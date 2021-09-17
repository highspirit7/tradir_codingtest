import { call, put, takeLatest } from 'redux-saga/effects';

import { GET_BEER_LIST_REQUEST, GET_BEER_LIST_SUCCESS, GET_BEER_LIST_FAILURE } from '../actions/types';

import axios from 'axios';

function getBeerListAPI() {
	return axios.get('https://api.punkapi.com/v2/beers');
}

export function* getBeerList() {
	try {
		const result = yield call(getBeerListAPI);

		yield put({
			type: GET_BEER_LIST_SUCCESS,
			payload: result.data,
		});
	} catch (error) {
		console.error(e);
		yield put({
			type: GET_BEER_LIST_FAILURE,
			payload: e.message,
		});
	}
}

export function* watchGetBeerList() {
	yield takeLatest(GET_BEER_LIST_REQUEST, getBeerList);
}
