import React, { Component, PropTypes } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actionCreators from '../actions';
import * as styleConstants from '../constants/styles';

class BalanceScreen extends Component {
    static propTypes = {
        balance: PropTypes.number.isRequired,
        currency: PropTypes.string.isRequired,
        actions: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);

        this.back = this.back.bind(this);
        this.addExpence = this.addExpence.bind(this);
    }

    back() {
        this.props.actions.changePage('menu');
    }

    addExpence() {
        this.props.actions.changePage('addExpence');
    }

    render() {
        const { balance, currency } = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.balance}>
                    <Text style={styles.balanceText}>{balance} {currency}</Text>
                </View>

                <TouchableOpacity style={[styles.button, styles.backButton]} onPress={this.back}>
                    <Text style={[styles.buttonText, styles.menuButtonText]}>☰</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.button, styles.addExpenceButton]} onPress={this.addExpence}>
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
        backgroundColor: '#1a97cb',
    },
    balance: {
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
    backButton: {
        top: styleConstants.MENU_PADDING + styleConstants.BUTTON_PADDING,
        left: styleConstants.BUTTON_PADDING,
    },
    addExpenceButton: {
        bottom: styleConstants.BUTTON_PADDING,
        right: styleConstants.BUTTON_PADDING,
    },
    buttonText: {
        backgroundColor: 'transparent',
        color: '#fff',
        fontSize: 34,
        textAlign: 'center',
    },
    menuButtonText: {
        fontSize: 24,
        paddingTop: 6.5,
    }
});

export default connect(
    state => state,
    dispatch => ({actions: bindActionCreators(actionCreators, dispatch)})
)(BalanceScreen);
