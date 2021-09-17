import { enableES5, produce } from 'immer';
import { GET_BEER_LIST_REQUEST, GET_BEER_LIST_SUCCESS, GET_BEER_LIST_FAILURE } from '../actions/types';

// immer를 사용하는 모든 곳에 해주어야 한다 for support IE11...
enableES5();

const INITIAL_STATE = {
  isLoading: false,
  errorMessage: "",
	allBeerList: [],
	filteredBeerList: [],
};

export default beerlist = (state = INITIAL_STATE, action) => {
	return produce(state, (draft) => {
		switch (action.type) {
			case GET_BEER_LIST_REQUEST:
				draft.isLoading = true;
				break;
			case GET_BEER_LIST_SUCCESS:
				draft.allBeerList = action.payload;
				draft.filteredBeerList = action.payload;
        draft.isLoading = false;
				break;
			case GET_BEER_LIST_FAILURE:
				draft.isLoading = false;
        draft.errorMessage = action.payload;
        break;
			default:
				return state;
		}
	});
};
