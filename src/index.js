import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware, compose } from 'redux';

import rootReducer from './store';
import { rootSaga } from './store';

import Routes from './Routes';

import GlobalStyles from 'styles/GlobalStyles';



ReactDOM.render(
	<Provider store={store}>
    <GlobalStyles />
		<Routes />
	</Provider>,
	document.getElementById('root')
);
