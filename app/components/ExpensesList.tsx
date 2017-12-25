import * as React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import * as _ from 'lodash';
import { ICategory, IExpense } from '../interfaces';
import { ExpensesListItem } from './ExpensesListItem';
import moment = require('moment');
import { DATE_FORMAT } from '../constants/formats';

interface IProps {
    expenses: IExpense[];
    categories: ICategory[];
    currency: string;
}

export class ExpensesList extends React.PureComponent<IProps, {}> {
    render() {
        const { categories, currency } = this.props;
        console.log('ExpensesList', this.props)

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
