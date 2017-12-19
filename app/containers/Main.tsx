import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actionCreators, { IActions } from '../actions';

import { AsyncStorage } from 'react-native';

import { Navigator } from './Navigator';
import { IAppState, IExpense } from '../interfaces';

interface IPropsT {
    expenses: IExpense[];
}

type IProps = IPropsT & {actions: IActions};

class Main extends React.PureComponent<IProps, {}> {
    componentDidMount() {
        const { actions } = this.props;

        AsyncStorage.getItem('categories')
            .then(json => JSON.parse(json))
            .catch(() => actions.setCategories())
            .then(actions.setCategories);

        AsyncStorage.getItem('expenses')
            .then(json => JSON.parse(json))
            .then(actions.setExpenses)
            .catch(() => actions.setExpenses())
            .then(() => {
                const { expenses } = this.props;
                actions.calculateBalance(expenses);
            });
    }

    render() {
        return (
            <Navigator />
        );
    }
}

const mapStateToProps = (state: IAppState): IPropsT => ({
    expenses: state.expenses,
});

const mapDispatchToProps = (dispatch): {actions: IActions} => ({
    actions: bindActionCreators(actionCreators, dispatch),
});

const connected = connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);
export { connected as Main };
