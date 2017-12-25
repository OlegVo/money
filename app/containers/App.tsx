import * as React from 'react';
import { createStore, compose } from 'redux';
// import devTools from 'remote-redux-devtools';
import { Provider } from 'react-redux';
import * as moment from 'moment';
require('moment/locale/ru');
import rootReducer from '../reducers';

import { Main } from './Main';

const initialState = {};

const enhancer = compose(
    /*eslint-disable */
    // __DEV__ ? devTools() : f => f
    /*eslint-enable */
);
const store = createStore(rootReducer, initialState, enhancer);

moment.locale('ru');

export default class App extends React.PureComponent<{}, {}> {
    render() {
        return (
            <Provider store={store}>
                <Main />
            </Provider>
        );
    }
}
