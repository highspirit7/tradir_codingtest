/* eslint-disable react/display-name */
import React, { useState, forwardRef, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useHistory, Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import MaterialTable, { MTableCell } from 'material-table';

import { getBeerListRequest, selectBeerInTable, switchTableColumns } from 'store/actions/beerlist';

import HomeIcon from '@material-ui/icons/Home';
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
	const { allBeerList, filteredBeerList, selectedBeer, tableColumns } = useSelector((state) => state.beerlist);
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
			<HomeLinkWrapper>
				<Link to='/'>
					<HomeIcon fontSize='large' />
				</Link>
			</HomeLinkWrapper>

			<MaterialTable
				icons={tableIcons}
				options={{
					search: false,
					draggable: true,
					sorting: false,
				}}
				onColumnDragged={(sourceIndex, destinationIndex) => {
					dispatch(switchTableColumns(sourceIndex, destinationIndex));
				}}
				onRowClick={(event, rowData) => handleBeerClick(rowData.tableData.id)}
				columns={tableColumns.map((column) => ({ ...column }))}
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

const HomeLinkWrapper = styled.div`
	width: 100%;
  height: 80px;
	display: flex;
	justify-content: center;
	align-items: center;
`;
