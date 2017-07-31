import React, { Component, PropTypes } from 'react';
import {
    View,
    StyleSheet,
    StatusBar,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actionCreators from '../actions';
import * as styleConstants from '../constants/styles';

import BalanceScreen from './BalanceScreen';
import AddExpenseScreen from './AddExpeneseScreen';
import PlanningScreen from './PlanningScreen';
import ExpensesScreen from './ExpensesScreen';

import Menu from './Menu';

class Navigator extends Component {
    static propTypes = {
        navigation: PropTypes.shape({
            page: PropTypes.string.isRequired,
        }).isRequired,
        actions: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);

        this.pages = {
            balance: <BalanceScreen />,
            addExpense: <AddExpenseScreen />,
            planning: <PlanningScreen />,
            expenses: <ExpensesScreen />,
        };
    }

    render() {
        const { navigation, actions } = this.props;
        const { page } = navigation;

        const component = this.pages[page];

        return (
            <View style={styles.panel}>
                {component}

                <StatusBar animated={true} barStyle='light-content' />

                <Menu actions={actions} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    panel: {
        flex: 1,
        paddingBottom: styleConstants.MENU_HEIGHT,
    },
});

export default connect(
    state => state,
    dispatch => ({actions: bindActionCreators(actionCreators, dispatch)})
)(Navigator);
