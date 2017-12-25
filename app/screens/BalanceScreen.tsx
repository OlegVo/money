import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actionCreators from '../actions';
import * as styleConstants from '../constants/styles';
import { IAppState, Page } from '../interfaces';
import { IActions } from '../actions';
import {
    BASE_FONT_COLOR, BASE_FONT_SIZE, BLUE_FONT_COLOR, BUTTON_BORDER_COLOR, GRAY_BACKGROUND_COLOR, MENU_PADDING,
    BASE_HORIZONTAL_PADDING,
} from '../constants/styles';
import { CategoriesList } from '../components';

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
        this.props.actions.startEditingExpense();
        this.props.actions.pushPage(Page.Categories);
    }

    render() {
        const { balance, currency } = this.props;

        return (
            <View style={styles.container}>
                <Text style={styles.caption}>Баланс</Text>

                <View style={styles.balance}>
                    <Text style={styles.balanceText}>{balance} </Text><Text style={styles.currencyText}>{currency}</Text>
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
        paddingTop: MENU_PADDING,
        paddingHorizontal: BASE_HORIZONTAL_PADDING,
    },
    caption: {
        fontSize: BASE_FONT_SIZE,
        color: BASE_FONT_COLOR,
    },
    balance: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    balanceText: {
        fontSize: 40,
        color: BLUE_FONT_COLOR,
    },
    currencyText: {
        fontSize: 26,
        marginBottom: 3,
        color: BLUE_FONT_COLOR,
    },
    button: {
        position: 'absolute',
        width: styleConstants.BUTTON_RADIUS,
        height: styleConstants.BUTTON_RADIUS,
        borderRadius: styleConstants.BUTTON_RADIUS / 2,
        borderWidth: 1,
        borderColor: BUTTON_BORDER_COLOR,
        backgroundColor: GRAY_BACKGROUND_COLOR,
    },
    addExpenseButton: {
        bottom: styleConstants.BUTTON_PADDING,
        right: styleConstants.BUTTON_PADDING,
    },
    buttonText: {
        backgroundColor: 'transparent',
        color: BASE_FONT_COLOR,
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
