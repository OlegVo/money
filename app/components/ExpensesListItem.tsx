import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as moment from 'moment';
import * as styleConstants from '../constants/styles';
import * as formats from '../constants/formats';
import { ICategory, IExpense } from '../interfaces';
import { fonts } from '../constants/styles';
import { ListItemWithSum } from './common/ListItemWithSum';

interface IProps {
    expense: IExpense;
    categories: ICategory[];
    currency: string;
    displayDate: boolean;
    onPress: (expense: IExpense) => void;
}

export class ExpensesListItem extends React.PureComponent<IProps> {
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

                <TouchableOpacity activeOpacity={styleConstants.TOUCHABLE_ACTIVE_OPACITY} onPress={this.onPress}>
                    <ListItemWithSum
                        text={expense.comment || category.name}
                        sum={expense.sum}
                        currency={currency}
                        circleColor={category.color}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    date: {
        backgroundColor: styleConstants.GRAY_BACKGROUND_COLOR,
        paddingVertical: 6,
        paddingHorizontal: styleConstants.BASE_HORIZONTAL_PADDING,
        borderBottomWidth: 1,
        borderColor: styleConstants.LIST_BORDER_COLOR,
    },
    dateText: {
        ...fonts.base,
    },
});
