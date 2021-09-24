import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';
import Routes from './Routes';
import GlobalStyles from 'styles/GlobalStyles';

import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

ReactDOM.render(
	<Provider store={store}>
		<GlobalStyles />
		<Routes />
	</Provider>,
	document.getElementById('root')
);
