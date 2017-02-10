import React, { Component } from 'react';
import {
} from 'react-native';

import Navigator from './Navigator';

const store = {
    balance: 3200.0,
    currency: '₽'
};

export default class App extends Component {
    render() {
        return (
            <Navigator store={store} />
        );
    }
}
