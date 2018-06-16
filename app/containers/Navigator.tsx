import * as React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actionCreators from '../actions/index';
import * as styleConstants from '../constants/styles';
import { BalanceScreen, EditExpenseScreen, PlanningScreen, SelectDateScreen, CategoriesScreen, ReportsScreen } from '../screens';
import { Menu } from '../components';
import { IAppState, INavigationState, Page } from '../interfaces';
import { IActions } from '../actions';

interface IPropsT {
    navigation: INavigationState;
}

type IProps = IPropsT & {actions: IActions};

class Navigator extends React.PureComponent<IProps> {
    constructor(props) {
        super(props);

        this.renderComponent = this.renderComponent.bind(this);
    }

    renderComponent() {
        const pages = this.props.navigation.pages;

        switch (pages[pages.length - 1]) {
            case Page.Balance:
                return <BalanceScreen />;

            case Page.EditExpense:
                return <EditExpenseScreen />;

            case Page.Categories:
                return <CategoriesScreen />;

            case Page.SelectDate:
                return <SelectDateScreen />;

            case Page.Planning:
                return <PlanningScreen />;

            case Page.Reports:
                return <ReportsScreen />;
        }
    }

    render() {
        const { actions } = this.props;

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
