import * as React from 'react';
import { View, TouchableOpacity } from 'react-native';
import * as moment from 'moment';
import * as styleConstants from '../constants/styles';
import { colors, list } from '../constants/styles';
import * as formats from '../constants/formats';
import { ICategory, IExpense, IIncome } from '../types';
import { ListItemWithSum } from './common/ListItemWithSum';
import { ListSectionTitle } from './common/ListSectionTitle';
import { NO_CATEGORY } from '../constants/strings';

interface IProps {
    transaction: IExpense | IIncome;
    categories: ICategory[];
    currency: string;
    displayDate: boolean;
    onPress?: (transaction: IExpense | IIncome) => void;
}

export class TransactionListItem extends React.PureComponent<IProps> {
    constructor(props) {
        super(props);

        this.onPress = this.onPress.bind(this);
    }

    onPress() {
        const { transaction, onPress } = this.props;
        if (onPress) {
            onPress(transaction);
        }
    }

    render() {
        const { transaction, categories, currency, displayDate } = this.props;

        const category = transaction.type === 'expense' ? categories.find(c => (c === transaction.category)) : undefined;

        let date;
        if (displayDate) {
            date = moment(transaction.date, formats.DATE_FORMAT).format('LL').replace(/,?\s?\d+\s?\D*$/, '');
        }

        return (
            <View>
                {date &&
                    <ListSectionTitle text={date} />
                }

                <TouchableOpacity activeOpacity={styleConstants.TOUCHABLE_ACTIVE_OPACITY} onPress={this.onPress}>
                    <ListItemWithSum
                        text={transaction.comment || category && category.name || NO_CATEGORY}
                        sum={transaction.sum}
                        currency={currency}
                        circleColor={category ? category.color : list.item.backgroundColor}
                        textColor={transaction.type === 'income' ? colors.incomeGreen : undefined}
                        plusSign={transaction.type === 'income'}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}
