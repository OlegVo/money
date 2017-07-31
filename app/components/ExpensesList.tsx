import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import * as styleConstants from '../constants/styles';
import * as formats from '../constants/formats';
import * as moment from 'moment';
import _ from 'lodash';

export class ExpensesList extends React.Component<any, {}> {
    // static propTypes = {
    //     expenses: PropTypes.array.isRequired,
    //     categories: PropTypes.array.isRequired,
    //     currency: PropTypes.string.isRequired,
    // };

    render() {
        const { categories, currency } = this.props;
        console.log('categories', categories)

        const expenses = _.sortBy(this.props.expenses, expense => expense.date);

        return (
            <View style={styles.container}>
                <ScrollView style={styles.list}>
                    {expenses.map((expense, i) => {
                        const category = categories.find(category => (category.id === expense.category));
                        const date = moment(expense.date, formats.DATE_FORMAT).format('LL').replace(/,?\s?\d+\s?\D*$/, '');

                        const sameDate = !!(expenses[i - 1] && expenses[i - 1].date === expense.date);
                        console.log('expense', expense)
                        console.log('expense.date', expense.date)
                        console.log('sameDate', sameDate)

                        return (
                            <View key={i}>
                                {!sameDate &&
                                    <View style={styles.date}>
                                        <Text style={styles.dateText}>{date}</Text>
                                    </View>
                                }

                                <TouchableOpacity style={styles.expense} activeOpacity={styleConstants.TOUCHABLE_ACTIVE_OPACITY}>
                                    <View style={styles.category}>
                                        <View style={[styles.categoryColor, {backgroundColor: category.color}]} />
                                        <Text style={styles.categoryText}>{category.name}</Text>
                                    </View>

                                    <View style={styles.sum}>
                                        <Text style={styles.sumText}>{expense.sum}</Text>
                                        <Text style={styles.currencyText}>{currency}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
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
    list: {
    },
    expense: {
        paddingVertical: 15,
        paddingHorizontal: styleConstants.BASE_HORIZONTAL_PADDING,
        borderBottomWidth: 1,
        borderColor: styleConstants.LIST_BORDER_COLOR,
    },
    category: {
        flexDirection: 'row',
        minHeight: 20,
    },
    categoryColor: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginTop: 5,
        marginRight: 5,
    },
    categoryText: {
        fontSize: styleConstants.BASE_FONT_SIZE,
        color: styleConstants.BASE_FONT_COLOR,
    },
    date: {
        backgroundColor: styleConstants.GRAY_BACKGROUND_COLOR,
        paddingVertical: 6,
        paddingHorizontal: styleConstants.BASE_HORIZONTAL_PADDING,
        borderBottomWidth: 1,
        borderColor: styleConstants.LIST_BORDER_COLOR,
    },
    dateText: {
        fontSize: styleConstants.BASE_FONT_SIZE,
        color: styleConstants.BASE_FONT_COLOR,
    },
    sum: {
        position: 'absolute',
        top: 15,
        right: styleConstants.BASE_HORIZONTAL_PADDING,
        flex: 1,
        flexDirection: 'row',
    },
    sumText: {
        fontSize: styleConstants.BASE_FONT_SIZE,
        color: styleConstants.BASE_FONT_COLOR,
    },
    currencyText: {
        fontSize: styleConstants.BASE_FONT_SIZE,
        color: styleConstants.LIST_BORDER_COLOR,
        paddingLeft: 3,
    },
});
