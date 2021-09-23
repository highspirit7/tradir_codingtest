/* eslint-disable react/display-name */
import React, { useState, forwardRef, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import MaterialTable, { MTableCell } from 'material-table';

import { getBeerListRequest, selectBeerInTable } from 'store/actions/beerlist';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

import BeerModal from 'components/BeerList/BeerModal';

const Beerlist = () => {
	const { allBeerList, filteredBeerList, selectedBeer } = useSelector((state) => state.beerlist);
	const dispatch = useDispatch();
	const beerModal = useRef(null);

	const tableIcons = {
		Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
		Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
		Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
		Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
		DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
		Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
		Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
		Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
		FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
		LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
		NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
		PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
		ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
		Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
		SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
		ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
		ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
	};

	const handleBeerClick = (index) => {
		console.log();
		dispatch(selectBeerInTable(filteredBeerList[index]));
		beerModal.current.handleOpen();
	};

	useEffect(() => {
		dispatch(getBeerListRequest());
	}, []);

	// console.log(filteredBeerList);

	return filteredBeerList.length > 0 ? (
		<div style={{ width: '800px' }}>
			<MaterialTable
				icons={tableIcons}
				options={{
					search: false,
				}}
				onRowClick={(event, rowData) => handleBeerClick(rowData.tableData.id)}
				columns={[
					{ title: 'Name', field: 'name' },
					{ title: 'TagLine', field: 'tagline', disableClick: true },
					{ title: 'First Brewed', field: 'first_brewed', disableClick: true },
					{ title: 'ABV', field: 'abv', type: 'numeric', disableClick: true },
					{ title: 'IBU', field: 'ibu', type: 'numeric', disableClick: true },
					{ title: 'Ph', field: 'ph', type: 'numeric', disableClick: true },
				]}
				data={filteredBeerList.map((beer) => {
					const { name, tagline, first_brewed, abv, ibu, ph } = beer;

					return {
						name,
						tagline,
						first_brewed,
						abv,
						ibu,
						ph,
					};
				})}
				components={{
					Cell: (props) =>
						props.columnDef.field === 'name' ? (
							<>
								<NameCell {...props} />
							</>
						) : (
							<MTableCell {...props} disableClick />
						),
				}}
				title='Beer List'
			/>
			<BeerModal ref={beerModal} beer={selectedBeer} />
		</div>
	) : (
		<p>데이터가 없습니다</p>
	);
};

export default Beerlist;

const NameCell = styled(MTableCell)`
	cursor: pointer;

	&:hover {
		font-weight: bold !important;
	}
`;
