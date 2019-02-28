import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { addThinSpaces } from '../helpers/string';
import { BASE_HORIZONTAL_PADDING, fonts, monthSwitcher, totalLine } from '../constants/styles';
import { Moment } from 'moment';
import { IExpense } from '../types';
import * as styleConstants from '../constants/styles';
import { filterExpensesByDates } from '../helpers/expenses';

interface IProps {
    startDate: Moment;
    endDate: Moment;
    expenses: IExpense[];
    currency: string;
}

export class TransactionsTotal extends React.PureComponent<IProps> {
    render() {
        const { startDate, endDate, expenses, currency } = this.props;

        const rangeExpenses = filterExpensesByDates(expenses, startDate, endDate);

        const total = rangeExpenses.reduce((sum, e) => sum + e.sum, 0);

        return (
            <View style={styles.container}>
                <View style={styles.left}>
                    <Text style={styles.text}>Расходы</Text>
                </View>
                <View style={styles.total}>
                    <Text style={styles.text}>{addThinSpaces(total)}</Text>
                    <Text style={styles.text}>{currency}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: BASE_HORIZONTAL_PADDING,
        borderTopWidth: 1,
        borderColor: styleConstants.LIST_BORDER_COLOR,
    },
    left: {},
    text: {
        ...fonts.base,
        fontSize: totalLine.fontSize,
        lineHeight: monthSwitcher.height,
    },
    total: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
});
