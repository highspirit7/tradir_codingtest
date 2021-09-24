import React from 'react';
import { Select } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import { filterByAbv } from 'store/actions/beerlist';

const { Option } = Select;

const children = [
	<Option key='4~5'>4~5</Option>,
	<Option key='5~6'>5~6</Option>,
	<Option key='6~7'>6~7</Option>,
	<Option key='7~10'>7~10</Option>,
	<Option key='10~15'>10~15</Option>,
	<Option key='15~'>15~</Option>,
];

const SelectAbv = () => {
	const { allBeerList, filteredBeerList } = useSelector((state) => state.beerlist);
	const dispatch = useDispatch();

	function handleChange(value) {
		dispatch(filterByAbv(value));
	}

	return (
		<Select
			mode='multiple'
			allowClear
			style={{ width: '100%' }}
			placeholder='Please select Abv'
			// defaultValue={['a10', 'c12']}
			onChange={handleChange}>
			{children}
		</Select>
	);
};

export default SelectAbv;
