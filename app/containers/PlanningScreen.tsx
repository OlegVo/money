import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actionCreators from '../actions/index';
import { IAppState } from '../interfaces';
import { IActions } from '../actions';

interface IPropsT {
    balance: number;
    currency: string;
}

type IProps = IPropsT & {actions: IActions};

class PlanningScreen extends React.PureComponent<IProps, {}> {
    render() {
        return (
            <View style={styles.container}>
                <Text>План на месяц</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
});

const mapStateToProps = (state: IAppState): IPropsT => ({
    balance: state.balance,
    currency: state.currency,
});

const mapDispatchToProps = (dispatch): {actions: IActions} => ({
    actions: bindActionCreators(actionCreators, dispatch),
});

const connected = connect(
    mapStateToProps,
    mapDispatchToProps
)(PlanningScreen);
export { connected as PlanningScreen };
