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
import { IAppState, INavigationState, Page } from '../interfaces';
import { IActions } from '../actions';

interface IPropsT {
    navigation: INavigationState;
}

type IProps = IPropsT & {actions: IActions};

class Navigator extends React.PureComponent<IProps, {}> {
    constructor(props) {
        super(props);

        this.renderComponent = this.renderComponent.bind(this);
    }

    renderComponent() {
        switch (this.props.navigation.page) {
            case Page.Balance:
                return <BalanceScreen />;

            case Page.AddExpence:
                return <AddExpenseScreen />;

            case Page.Planning:
                return <PlanningScreen />;

            case Page.Expenses:
                return <ExpensesScreen />;
        }
    }

    render() {
        const { actions } = this.props;
        console.log('Navigator', this.props)

        return (
            <View style={styles.panel}>
                {this.renderComponent()}

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

const mapStateToProps = (state: IAppState): IPropsT => ({
    navigation: state.navigation,
});

const mapDispatchToProps = (dispatch): {actions: IActions} => ({
    actions: bindActionCreators(actionCreators, dispatch),
});

const connected = connect(
    mapStateToProps,
    mapDispatchToProps
)(Navigator);
export { connected as Navigator };
