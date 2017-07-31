import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actionCreators from '../actions';

import { AsyncStorage } from 'react-native';

import { Navigator } from './Navigator';

class Main extends React.Component<any, {}> {
    // static propTypes = {
    //     expenses: PropTypes.array,
    //     actions: PropTypes.object.isRequired,
    // };

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
                actions.calculateBalance({expenses});
            });
    }

    render() {
        return (
            <Navigator />
        );
    }
}

const connected = connect(
    state => state,
    dispatch => ({actions: bindActionCreators(actionCreators, dispatch)})
)(Main);
export { connected as Main };
