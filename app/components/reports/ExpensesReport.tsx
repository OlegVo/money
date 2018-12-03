import * as React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { addThinSpaces } from '../../helpers/string';
import { BASE_HORIZONTAL_PADDING, BLUE_FONT_COLOR, fonts } from '../../constants/styles';
import { Moment } from 'moment';
import { ICategory, IExpense } from '../../interfaces';
import { formatRange } from '../../helpers/date';
import { ListItemWithSum } from '../common/ListItemWithSum';
import * as styleConstants from '../../constants/styles';
import { filterExpensesByDates } from '../../helpers/expenses';

interface ISumByCategory {
    category: ICategory;
    sum: number;
}

interface IProps {
    startDate: Moment;
    endDate: Moment;
    expenses: IExpense[];
    categories: ICategory[];
    currency: string;
}

export class ExpensesReport extends React.PureComponent<IProps> {
    render() {
        const { startDate, endDate, expenses, currency } = this.props;

        const rangeExpenses = filterExpensesByDates(expenses, startDate, endDate);

        const sumsByCategory: ISumByCategory[] = [];
        const sumsByCategoryMap: { [i: string]: ISumByCategory } = {};
        rangeExpenses.forEach(expense => {
            if (sumsByCategoryMap[expense.category.id]) {
                sumsByCategoryMap[expense.category.id].sum += expense.sum;
            } else {
                const newSum = {
                    sum: expense.sum,
                    category: expense.category,
                };
                sumsByCategory.push(newSum);
                sumsByCategoryMap[expense.category.id] = newSum;
            }
        });
        sumsByCategory.sort((a, b) => a.sum > b.sum ? -1 : 1);

        const total = rangeExpenses.reduce((sum, e) => sum + e.sum, 0);
        const maxSum = Math.max(...rangeExpenses.map(e => e.sum));

        return (
            <View style={styles.container}>
                <Text style={styles.title}>{formatRange(startDate, endDate)}</Text>

                <View style={styles.subtitle}>
                    <View style={styles.left}>
                        <Text style={styles.subtitleText}>Расходы</Text>
                    </View>
                    <View style={styles.total}>
                        <Text style={styles.sumText}>{addThinSpaces(total)}</Text><Text style={styles.currencyText}>{currency}</Text>
                    </View>
                </View>

                <View style={styles.list}>
                    <ScrollView>
                        {sumsByCategory.map((sumByCategory, i) => {
                            const percent = Math.ceil(sumByCategory.sum * 100 / maxSum);

                            return (
                                <ListItemWithSum
                                    key={i}
                                    text={sumByCategory.category.name}
                                    sum={sumByCategory.sum}
                                    currency={currency}
                                    lineColor={sumByCategory.category.color}
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
    subtitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: BASE_HORIZONTAL_PADDING,
        paddingVertical: 5,
        borderTopWidth: 1,
        borderColor: styleConstants.LIST_BORDER_COLOR,
    },
    list: {
        borderTopWidth: 1,
        borderColor: styleConstants.LIST_BORDER_COLOR,
    },
    left: {
        paddingTop: 10,
    },
    subtitleText: {
        ...fonts.base,
        fontSize: 18,
    },
    total: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    sumText: {
        fontSize: 30,
        color: BLUE_FONT_COLOR,
    },
    currencyText: {
        fontSize: 22,
        color: BLUE_FONT_COLOR,
    },
});
