import { GET_BEER_LIST_REQUEST, GET_BEER_LIST_SUCCESS, GET_BEER_LIST_FAILURE } from './types';


export const getBeerListRequest = () => {
	return { type: GET_BEER_LIST_REQUEST };
};

export const getBeerListSuccess = () => {
	return { type: GET_BEER_LIST_SUCCESS };
};

export const getBeerListFailure = () => {
	return { type: GET_BEER_LIST_FAILURE };
};
