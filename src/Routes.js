import React from 'react';
import 'antd/dist/antd.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

import Home from 'Pages/Home';
import Beerlist from 'Pages/Beerlist';
// import ReactGA from "react-ga";

const Routes = () => {
	return (
		<Router>
			<Switch>
				<Main>
					<Route path='/' component={Home} exact />
					<Route path='/home' component={Home} />
					<Route path='/beerlist' component={Beerlist} />
				</Main>
			</Switch>
		</Router>
	);
};

export default Routes;

const Main = styled.main`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0 80px;
	/* max-width: 1200px; */
	min-height: 100vh;
`;
