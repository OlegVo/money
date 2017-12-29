import * as React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import * as _ from 'lodash';
import { ICategory, IExpense, Page } from '../interfaces';
import { ExpensesListItem } from './ExpensesListItem';
import moment = require('moment');
import { DATE_FORMAT } from '../constants/formats';
import { IActions } from '../actions';

interface IProps {
    expenses: IExpense[];
    categories: ICategory[];
    currency: string;
    actions: IActions;
}

export class ExpensesList extends React.PureComponent<IProps, {}> {
    constructor(props) {
        super(props);

        this.editExpense = this.editExpense.bind(this);
    }

    editExpense(expense: IExpense) {
        console.log('editExpense', expense)
        const { actions } = this.props;
        actions.startEditingExpense(expense);
        actions.pushPage(Page.EditExpense);
    }

    render() {
        const { categories, currency } = this.props;

        const expenses: IExpense[] = _.sortBy(this.props.expenses, expense => -moment(expense.date, DATE_FORMAT).format('YYYY-MM-DD'));

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
    },
});
