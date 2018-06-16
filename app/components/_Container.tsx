import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actionCreators from '../actions/index';
import { IAppState } from '../interfaces';
import { IActions } from '../actions';
import { MAIN_BACKGROUND_COLOR } from '../constants/styles';

interface IPropsT {
    balance: number;
}

type IProps = IPropsT & { actions: IActions };

class Container extends React.PureComponent<IProps> {
    render() {
        return (
            <View style={styles.container}>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: MAIN_BACKGROUND_COLOR,
    },
});

const mapStateToProps = (state: IAppState): IPropsT => ({
    balance: state.balance,
});

const mapDispatchToProps = (dispatch): {actions: IActions} => ({
    actions: bindActionCreators(actionCreators, dispatch),
});

const connected = connect(
    mapStateToProps,
    mapDispatchToProps
)(Container);
export { connected as Container };
