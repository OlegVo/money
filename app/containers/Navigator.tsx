import * as React from 'react';
import {
    View,
    StyleSheet,
    StatusBar,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actionCreators from '../actions/index';
import * as styleConstants from '../constants/styles';

import { BalanceScreen, AddExpenseScreen, PlanningScreen, ExpensesScreen } from '../containers';
import { Menu } from '../components';

class Navigator extends React.Component<any, {}> {
    // static propTypes = {
    //     navigation: PropTypes.shape({
    //         page: PropTypes.string.isRequired,
    //     }).isRequired,
    //     actions: PropTypes.object.isRequired,
    // };

    private pages;

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

const connected = connect(
    state => state,
    dispatch => ({actions: bindActionCreators(actionCreators, dispatch)})
)(Navigator);
export { connected as Navigator };
