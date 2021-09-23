import { GET_BEER_LIST_REQUEST, GET_BEER_LIST_SUCCESS, GET_BEER_LIST_FAILURE, SELECT_BEER_IN_TABLE } from './types';

export const getBeerListRequest = () => {
	return { type: GET_BEER_LIST_REQUEST };
};

export const getBeerListSuccess = () => {
	return { type: GET_BEER_LIST_SUCCESS };
};

export const getBeerListFailure = () => {
	return { type: GET_BEER_LIST_FAILURE };
};

export const selectBeerInTable = (selectedBeer) => {
	return { type: SELECT_BEER_IN_TABLE, payload: selectedBeer };
};
