import * as React from 'react';
import * as moment from 'moment';
import { View, StyleSheet, ScrollView } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actionCreators from '../actions';
import { IAppState, ICategories, IExpense, IIncome, IPeriod, IPlanning } from '../types';
import { IActions } from '../actions';
import { MENU_PADDING } from '../constants/styles';
import { TransactionsList } from '../components';
import { filterExpensesByDates, filterIncomesByDates } from '../helpers/expenses';
import { getMonthPlan } from '../helpers/planning';
import { Balance } from '../components/Balance';
import { AddTransactionButton } from '../components/AddTransactionButton';
import { MonthSwitcher } from '../components/MonthSwitcher';
import { DATE_FORMAT } from '../constants/formats';

interface IPropsT {
    balance: number;
    currency: string;
    expenses: IExpense[];
    planning: IPlanning;
    categories: ICategories;
    currentPeriod: IPeriod;
}

type IProps = IPropsT & { actions: IActions };

class MainScreen extends React.PureComponent<IProps> {
    render() {
        const { balance, currency, expenses, categories, planning, currentPeriod, actions } = this.props;

        const startDate = moment(currentPeriod.startDate, DATE_FORMAT).startOf('day');
        const endDate = moment(currentPeriod.endDate, DATE_FORMAT).endOf('day');
        const now = moment().endOf('day');
        const monthExpenses: IExpense[] = filterExpensesByDates(expenses, startDate, endDate);

        const monthPlan = getMonthPlan(planning, now);
        const monthIncomes: IIncome[] = monthPlan ? filterIncomesByDates(monthPlan.incomes, startDate, now) : [];

        return (
            <View style={styles.container}>
                <Balance balance={balance} currency={currency} />

                <AddTransactionButton actions={actions} />

                <ScrollView>
                    <MonthSwitcher period={currentPeriod} actions={actions} />

                    <TransactionsList
                        expenses={monthExpenses}
                        incomes={monthIncomes}
                        categories={categories.expenses}
                        currency={currency}
                        actions={actions}
                    />
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: MENU_PADDING,
        position: 'relative',
    },
});

const mapStateToProps = (state: IAppState): IPropsT => ({
    balance: state.balance,
    currency: state.currency,
    expenses: state.expenses,
    planning: state.planning,
    categories: state.categories,
    currentPeriod: state.currentPeriod,
});

const mapDispatchToProps = (dispatch): { actions: IActions } => ({
    actions: bindActionCreators(actionCreators, dispatch),
});

const connected = connect(
    mapStateToProps,
    mapDispatchToProps,
)(MainScreen);
export { connected as MainScreen };
