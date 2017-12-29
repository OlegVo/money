import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as styleConstants from '../constants/styles';
import * as formats from '../constants/formats';
import * as moment from 'moment';
import { ICategory, IExpense } from '../interfaces';

interface IProps {
    expense: IExpense;
    categories: ICategory[];
    currency: string;
    displayDate: boolean;
    onPress: (expense: IExpense) => void;
}

export class ExpensesListItem extends React.PureComponent<IProps, {}> {
    constructor(props) {
        super(props);

        this.onPress = this.onPress.bind(this);
    }

    onPress() {
        const { expense, onPress } = this.props;
        onPress(expense);
    }

    render() {
        const { expense, categories, currency, displayDate } = this.props;

        const category = categories.find(c => (c === expense.category));
        if (!category) return null;

        let date;
        if (displayDate) {
            date = moment(expense.date, formats.DATE_FORMAT).format('LL').replace(/,?\s?\d+\s?\D*$/, '');
        }

        return (
            <View>
                {date &&
                    <View style={styles.date}>
                        <Text style={styles.dateText}>{date}</Text>
                    </View>
                }

                <TouchableOpacity style={styles.expense} activeOpacity={styleConstants.TOUCHABLE_ACTIVE_OPACITY} onPress={this.onPress}>
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
    }
}

const styles = StyleSheet.create({
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
