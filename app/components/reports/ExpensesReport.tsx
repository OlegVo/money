import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { addThinSpaces } from '../../helpers/string';
import { BLUE_FONT_COLOR, fonts } from '../../constants/styles';
import { Moment } from 'moment';
import { ICategory, IExpense } from '../../interfaces';
import { formatRange } from '../../helpers/date';
import * as formats from '../../constants/formats';
import moment = require('moment');
import { ListItemWithSum } from '../common/ListItemWithSum';

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
        console.log('rangeExpenses', rangeExpenses)

        // TODO суммировать расходы по категориям в новую структуру, записать туда ссылки на категории или названия

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

                {rangeExpenses.map((expense, i) => (
                    <ListItemWithSum
                        key={i}
                        text='Категория'
                        sum={expense.sum}
                        currency={currency}
                        circleColor='red'
                    />
                ))}
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
    },
    subtitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
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
