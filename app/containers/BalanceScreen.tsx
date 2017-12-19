import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actionCreators from '../actions/index';
import * as styleConstants from '../constants/styles';
import { IAppState, Page } from '../interfaces';
import { IActions } from '../actions';

interface IPropsT {
    balance: number;
    currency: string;
}

type IProps = IPropsT & {actions: IActions};

class BalanceScreen extends React.PureComponent<IProps, {}> {
    constructor(props) {
        super(props);

        this.addExpense = this.addExpense.bind(this);
    }

    addExpense() {
        this.props.actions.changePage(Page.AddExpence);
    }

    render() {
        const { balance, currency } = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.balance}>
                    <Text style={styles.balanceText}>{balance} {currency}</Text>
                </View>

                <TouchableOpacity style={[styles.button, styles.addExpenseButton]} onPress={this.addExpense}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: styleConstants.MAIN_BACKGROUND_COLOR,
    },
    balance: {
        paddingBottom: 80,
    },
    balanceText: {
        fontSize: 50,
        color: '#fff',
    },
    button: {
        position: 'absolute',
        width: styleConstants.BUTTON_RADIUS,
        height: styleConstants.BUTTON_RADIUS,
        borderRadius: styleConstants.BUTTON_RADIUS / 2,
        borderWidth: 1,
        borderColor: '#fff',
    },
    addExpenseButton: {
        bottom: styleConstants.BUTTON_PADDING,
        right: styleConstants.BUTTON_PADDING,
    },
    buttonText: {
        backgroundColor: 'transparent',
        color: '#fff',
        fontSize: 34,
        textAlign: 'center',
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
)(BalanceScreen);
export { connected as BalanceScreen };
