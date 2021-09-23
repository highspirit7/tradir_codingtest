import { enableES5, produce } from 'immer';
import { GET_BEER_LIST_REQUEST, GET_BEER_LIST_SUCCESS, GET_BEER_LIST_FAILURE, SELECT_BEER_IN_TABLE } from '../actions/types';

// immer를 사용하는 모든 곳에 해주어야 한다 for support IE11...
enableES5();

const INITIAL_STATE = {
	isLoading: false,
	errorMessage: '',
	allBeerList: [],
	filteredBeerList: [],
	// selectedBeer: {
	// 	name: '',
	// 	tagline: '',
	// 	first_brewed: '',
	// 	description: '',
	// 	image_url: '',
	// 	abv: 0,
	// 	ibu: 0,
	// 	target_fg: 0,
	// 	target_og: 0,
	// 	ebc: 0,
	// 	srm: 0,
	// 	ph: 0,
	// 	attenuation_level: 0,
	// 	volume: {},
	//   boil_volume: {
	//   },
	//   method: {

	//   },
	//   ingredients: {},
	//   food_pairing: [],
	//   brewers_tips
	// },
	selectedBeer: null,
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
			default:
				return state;
		}
	});
}
