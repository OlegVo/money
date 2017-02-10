import React, { Component } from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';

import MenuScreen from './MenuScreen';
import BalanceScreen from './BalanceScreen';

export default class Navigator extends Component {
    state = {
        page: 'menu',
    };

    render() {
        const { store } = this.props;
        const { page } = this.state;

        let component;
        switch (page) {
            case 'menu':
                component = <MenuScreen />;
                break;

            case 'balance':
                component = <BalanceScreen {...store} />;
                break;
        }

        return (
            <View style={styles.panel}>
                {component}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    panel: {
        flex: 1,
    },
});
