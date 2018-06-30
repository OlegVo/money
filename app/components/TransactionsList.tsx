import * as React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { ICategory, IExpense, IIncome, Page } from '../interfaces';
import { TransactionListItem } from './TransactionListItem';
import moment = require('moment');
import { DATE_FORMAT } from '../constants/formats';
import { IActions } from '../actions';
import * as styleConstants from '../constants/styles';

interface IProps {
    expenses: IExpense[];
    incomes: IIncome[];
    categories: ICategory[];
    currency: string;
    actions: IActions;
}

export class TransactionsList extends React.PureComponent<IProps> {
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
        const { expenses, incomes, categories, currency } = this.props;

        const transactions = [...expenses, ...incomes].sort((a, b) =>
            moment(a.date, DATE_FORMAT) < moment(b.date, DATE_FORMAT) ? 1 : -1);

        return (
            <View style={styles.container}>
                <ScrollView>
                    {transactions.map((transaction, i) => {
                        const sameDate = !!(transactions[i - 1] && transactions[i - 1].date === transaction.date);

                        return (
                            <TransactionListItem
                                key={transaction.id}
                                transaction={transaction}
                                categories={categories}
                                currency={currency}
                                displayDate={!sameDate}
                                onPress={transaction.type === 'expense' ? this.editExpense : undefined}
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
