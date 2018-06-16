import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actionCreators, { IActions } from '../actions';
import { Navigator } from './Navigator';
import { IAppState, IExpense } from '../interfaces';

interface IPropsT {
    expenses: IExpense[];
}

type IProps = IPropsT & {actions: IActions};

class Main extends React.PureComponent<IProps> {
    componentDidMount() {
        this.props.actions.loadApplicationData();
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
