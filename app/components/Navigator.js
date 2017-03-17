import React, { Component, PropTypes } from 'react';
import {
    View,
    StyleSheet,
    StatusBar,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actionCreators from '../actions';

import MenuScreen from './MenuScreen';
import BalanceScreen from './BalanceScreen';
import AddExpenceScreen from './AddExpeneseScreen';

class Navigator extends Component {
    static propTypes = {
        navigation: PropTypes.shape({
            page: PropTypes.string.isRequired,
        }).isRequired,
    };

    constructor(props) {
        super(props);

        this.pages = {
            menu: <MenuScreen />,
            balance: <BalanceScreen />,
            addExpence: <AddExpenceScreen />,
        };
    }

    render() {
        const { navigation } = this.props;
        const { page } = navigation;

        const component = this.pages[page];

        return (
            <View style={styles.panel}>
                {component}

                <StatusBar animated={true} barStyle='light-content' />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    panel: {
        flex: 1,
    },
});

export default connect(
    state => state,
    dispatch => ({actions: bindActionCreators(actionCreators, dispatch)})
)(Navigator);
