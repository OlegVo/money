import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actionCreators from '../actions';
import * as styleConstants from '../constants/styles';
import { IAppState, ICategoriesState, IExpense, Page } from '../interfaces';
import { IActions } from '../actions';
import {
    BLUE_FONT_COLOR, MENU_PADDING, BASE_HORIZONTAL_PADDING, fonts,
} from '../constants/styles';
import { ExpensesList } from '../components';
import { addThinSpaces } from '../helpers/string';

interface IPropsT {
    balance: number;
    currency: string;
    expenses: IExpense[];
    categories: ICategoriesState;
}

type IProps = IPropsT & {actions: IActions};

class BalanceScreen extends React.PureComponent<IProps> {
    constructor(props) {
        super(props);

        this.addExpense = this.addExpense.bind(this);
    }

    addExpense() {
        this.props.actions.startEditingExpense();
        this.props.actions.pushPage(Page.Categories);
    }

    render() {
        const { balance, currency, expenses, categories, actions } = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.balanceLine}>
                    <Text style={styles.caption}>Баланс</Text>

                    <View style={styles.balance}>
                        <Text style={styles.balanceText}>{addThinSpaces(balance)} </Text><Text style={styles.currencyText}>{currency}</Text>
                    </View>

                    <TouchableOpacity style={[styles.button, styles.addExpenseButton]} onPress={this.addExpense}>
                        <Text style={styles.buttonText}>+</Text>
                    </TouchableOpacity>
                </View>

                {expenses &&
                    <ExpensesList
                        expenses={expenses}
                        categories={categories.expenses}
                        currency={currency}
                        actions={actions}
                    />
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: MENU_PADDING,
    },
    balanceLine: {
        paddingHorizontal: BASE_HORIZONTAL_PADDING,
        paddingBottom: 8,
    },
    caption: {
        ...fonts.base,
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
        borderColor: BLUE_FONT_COLOR,
        backgroundColor: '#fff',
    },
    addExpenseButton: {
        top: 10,
        right: BASE_HORIZONTAL_PADDING,
    },
    buttonText: {
        backgroundColor: 'transparent',
        color: BLUE_FONT_COLOR,
        fontSize: 34,
        textAlign: 'center',
    },
});

const mapStateToProps = (state: IAppState): IPropsT => ({
    balance: state.balance,
    currency: state.currency,
    expenses: state.expenses,
    categories: state.categories,
});

const mapDispatchToProps = (dispatch): {actions: IActions} => ({
    actions: bindActionCreators(actionCreators, dispatch),
});

const connected = connect(
    mapStateToProps,
    mapDispatchToProps
)(BalanceScreen);
export { connected as BalanceScreen };
