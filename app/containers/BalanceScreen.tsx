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

class BalanceScreen extends React.Component<any, {}> {
    // static propTypes = {
    //     balance: PropTypes.number.isRequired,
    //     currency: PropTypes.string.isRequired,
    //     actions: PropTypes.object.isRequired,
    // };

    constructor(props) {
        super(props);

        this.addExpense = this.addExpense.bind(this);
    }

    addExpense() {
        this.props.actions.changePage('addExpense');
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

const connected = connect(
    state => state,
    dispatch => ({actions: bindActionCreators(actionCreators, dispatch)})
)(BalanceScreen);
export { connected as BalanceScreen };
