import * as React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { addThinSpaces } from '../../helpers/string';
import { BASE_HORIZONTAL_PADDING, BLUE_FONT_COLOR, fonts } from '../../constants/styles';
import { Moment } from 'moment';
import { ICategory, IExpense } from '../../interfaces';
import { formatRange } from '../../helpers/date';
import * as formats from '../../constants/formats';
import moment = require('moment');
import { ListItemWithSum } from '../common/ListItemWithSum';
import * as styleConstants from '../../constants/styles';

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
        console.log('ExpensesReport', this.props)
        const { startDate, endDate, expenses, currency } = this.props;

        const rangeExpenses = expenses.filter((e) => {
            const date = moment(e.date, formats.DATE_FORMAT);
            return date.valueOf() >= startDate.valueOf() && date.valueOf() <= endDate.valueOf();
        });

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

        return (
            <View style={styles.container}>
                <Text style={styles.title}>{formatRange(startDate, endDate)}</Text>

                {/* TODO Постоянные расходы */}

                <View style={styles.subtitle}>
                    <Text style={styles.text}>Обычные расходы</Text>
                    <View style={styles.total}>
                        <Text style={styles.sumText}>{addThinSpaces(total)}</Text><Text style={styles.currencyText}>{currency}</Text>
                    </View>
                </View>

                <View style={styles.list}>
                    <ScrollView>
                        {sumsByCategory.map((sumByCategory, i) => (
                            <ListItemWithSum
                                key={i}
                                text={sumByCategory.category.name}
                                sum={sumByCategory.sum}
                                currency={currency}
                                circleColor={sumByCategory.category.color}
                            />
                        ))}
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
        paddingHorizontal: BASE_HORIZONTAL_PADDING,
    },
    subtitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingHorizontal: BASE_HORIZONTAL_PADDING,
        paddingBottom: 10,
    },
    list: {
        borderTopWidth: 1,
        borderColor: styleConstants.LIST_BORDER_COLOR,
    },
    text: {
        ...fonts.base,
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
        // marginBottom: 3,
        color: BLUE_FONT_COLOR,
    },
});
