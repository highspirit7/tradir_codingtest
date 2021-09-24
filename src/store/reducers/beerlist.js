import { enableES5, produce } from 'immer';
import {
	GET_BEER_LIST_REQUEST,
	GET_BEER_LIST_SUCCESS,
	GET_BEER_LIST_FAILURE,
	SELECT_BEER_IN_TABLE,
	SWITCH_TABLE_COLUMNS,
} from '../actions/types';

// immer를 사용하는 모든 곳에 해주어야 한다 for support IE11...
enableES5();

const INITIAL_STATE = {
	isLoading: false,
	errorMessage: '',
	allBeerList: [],
	filteredBeerList: [],
	selectedBeer: null,
	tableColumns: [
		{ title: 'Name', field: 'name' },
		{ title: 'TagLine', field: 'tagline', disableClick: true },
		{ title: 'First Brewed', field: 'first_brewed', disableClick: true },
		{ title: 'ABV', field: 'abv', type: 'numeric', disableClick: true },
		{ title: 'IBU', field: 'ibu', type: 'numeric', disableClick: true },
		{ title: 'Ph', field: 'ph', type: 'numeric', disableClick: true },
	],
};

export default function beerlist(state = INITIAL_STATE, action) {
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
			case SELECT_BEER_IN_TABLE:
				draft.selectedBeer = action.payload;
				break;
			case SWITCH_TABLE_COLUMNS:
				const { sourceIndex, destinationIndex } = action.payload;
				const temp = draft.tableColumns[sourceIndex];
				draft.tableColumns[sourceIndex] = draft.tableColumns[destinationIndex];
				draft.tableColumns[destinationIndex] = temp;
				break;
			default:
				return state;
		}
	});
}
