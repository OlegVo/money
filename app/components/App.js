import React, { Component } from 'react';
import * as reducers from '../reducers';
import { createStore, combineReducers, compose } from 'redux';
// import devTools from 'remote-redux-devtools';
import { Provider } from 'react-redux';

import Navigator from './Navigator';

const initialState = {};
const reducer = combineReducers(reducers);

const enhancer = compose(
    /*eslint-disable */
    // __DEV__ ? devTools() : f => f
    /*eslint-enable */
);
const store = createStore(reducer, initialState, enhancer);

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Navigator />
            </Provider>
        );
    }
}
