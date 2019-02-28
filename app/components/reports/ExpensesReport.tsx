import * as React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { BASE_HORIZONTAL_PADDING, BLUE_FONT_COLOR, fonts } from '../../constants/styles';
import { Moment } from 'moment';
import { ICategory, IExpense } from '../../types';
import { formatRange } from '../../helpers/date';
import { ListItemWithSum } from '../common/ListItemWithSum';
import * as styleConstants from '../../constants/styles';
import { filterExpensesByDates } from '../../helpers/expenses';
import { NO_CATEGORY } from '../../constants/strings';
import { TransactionsTotal } from '../TransactionsTotal';

interface ISumByCategory {
    category?: ICategory;
    sum: number;
}

interface IProps {
    startDate: Moment;
    endDate: Moment;
    expenses: IExpense[];
    currency: string;
}

export class ExpensesReport extends React.PureComponent<IProps> {
    render() {
        const { startDate, endDate, expenses, currency } = this.props;

        const rangeExpenses = filterExpensesByDates(expenses, startDate, endDate);

        const sumsByCategory: ISumByCategory[] = [];
        const sumsByCategoryMap: { [i: string]: ISumByCategory } = {};
        rangeExpenses.forEach(expense => {
            const categoryId = expense.category ? expense.category.id : '0';
            if (sumsByCategoryMap[categoryId]) {
                sumsByCategoryMap[categoryId].sum += expense.sum;
            } else {
                const newSum = {
                    sum: expense.sum,
                    category: expense.category,
                };
                sumsByCategory.push(newSum);
                sumsByCategoryMap[categoryId] = newSum;
            }
        });
        sumsByCategory.sort((a, b) => (a.sum > b.sum ? -1 : 1));

        const maxSum = Math.max(...rangeExpenses.map(e => e.sum));

        return (
            <View style={styles.container}>
                <Text style={styles.title}>{formatRange(startDate, endDate)}</Text>

                <TransactionsTotal startDate={startDate} endDate={endDate} expenses={expenses} currency={currency} />

                <View style={styles.list}>
                    <ScrollView>
                        {sumsByCategory.map((sumByCategory, i) => {
                            const percent = Math.ceil((sumByCategory.sum * 100) / maxSum);
                            const category = sumByCategory.category;

                            return (
                                <ListItemWithSum
                                    key={i}
                                    text={category ? category.name : NO_CATEGORY}
                                    sum={sumByCategory.sum}
                                    currency={currency}
                                    lineColor={category && category.color}
                                    lineWidth={percent}
                                />
                            );
                        })}
                    </ScrollView>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        ...fonts.base, // TODO надо другой шрифт
        paddingTop: 10,
        paddingHorizontal: BASE_HORIZONTAL_PADDING,
        fontSize: 22,
        lineHeight: 40,
    },
    list: {
        borderTopWidth: 1,
        borderColor: styleConstants.LIST_BORDER_COLOR,
    },
    currencyText: {
        fontSize: 22,
        color: BLUE_FONT_COLOR,
    },
});
