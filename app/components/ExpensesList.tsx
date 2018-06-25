import * as React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import * as _ from 'lodash';
import { ICategory, IExpense, Page } from '../interfaces';
import { ExpensesListItem } from './ExpensesListItem';
import moment = require('moment');
import { DATE_FORMAT } from '../constants/formats';
import { IActions } from '../actions';
import * as styleConstants from '../constants/styles';
import { Moment } from 'moment';
import { filterExpensesByDates } from '../helpers/expenses';

interface IProps {
    expenses: IExpense[];
    startDate: Moment;
    endDate: Moment;
    categories: ICategory[];
    currency: string;
    actions: IActions;
}

export class ExpensesList extends React.PureComponent<IProps> {
    constructor(props) {
        super(props);

        this.editExpense = this.editExpense.bind(this);
    }

    editExpense(expense: IExpense) {
        const { actions } = this.props;
        actions.startEditingExpense(expense);
        actions.pushPage(Page.EditExpense);
    }

    render() {
        const { categories, startDate, endDate, currency } = this.props;

        let expenses: IExpense[] = filterExpensesByDates(this.props.expenses, startDate, endDate);
        expenses = _.sortBy(expenses, expense => -moment(expense.date, DATE_FORMAT).valueOf());

        return (
            <View style={styles.container}>
                <ScrollView>
                    {expenses.map((expense, i) => {
                        const sameDate = !!(expenses[i - 1] && expenses[i - 1].date === expense.date);

                        return (
                            <ExpensesListItem
                                key={i}
                                expense={expense}
                                categories={categories}
                                currency={currency}
                                displayDate={!sameDate}
                                onPress={this.editExpense}
                            />
                        );
                    })}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderColor: styleConstants.LIST_BORDER_COLOR,
    },
});
