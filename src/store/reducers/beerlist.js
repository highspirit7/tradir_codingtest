import React from 'react';
import { enableES5, produce } from 'immer';

import {
	GET_BEER_LIST_REQUEST,
	GET_BEER_LIST_SUCCESS,
	GET_BEER_LIST_FAILURE,
	SELECT_BEER_IN_TABLE,
	SWITCH_TABLE_COLUMNS,
	FILTER_BY_ABV,
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
		{ title: 'Name', field: 'name', filtering: false },
		{ title: 'TagLine', field: 'tagline', disableClick: true, filtering: false },
		{ title: 'First Brewed', field: 'first_brewed', disableClick: true, filtering: false },
		{
			title: 'ABV',
			field: 'abv',
			type: 'numeric',
			disableClick: true,
		},
		{ title: 'IBU', field: 'ibu', type: 'numeric', disableClick: true, filtering: false },
		{ title: 'Ph', field: 'ph', type: 'numeric', disableClick: true, filtering: false },
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
			case FILTER_BY_ABV:
				const arrays = Array(action.payload.length).fill([]);

				action.payload.forEach((abv, index) => {
					const abvRange = abv.split('~');

					if (abvRange[1]) {
						// abv 범위 상한선이 있는 경우
						arrays[index] = state.allBeerList.filter((beer) => {
							return beer.abv >= Number(abvRange[0]) && beer.abv < Number(abvRange[1]);
						});
					} else {
						// abv 범위 상한선이 없는 경우 ; 제일 마지막 range
						arrays[index] = state.allBeerList.filter((beer) => {
							return beer.abv >= Number(abvRange[0]);
						});
					}
				});

				if (arrays.flat().length > 0) {
					draft.filteredBeerList = arrays.flat();
				} else {
					draft.filteredBeerList = state.allBeerList;
				}
				break;
			default:
				return state;
		}
	});
}
