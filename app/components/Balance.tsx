import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { addThinSpaces } from '../helpers/string';
import { BASE_HORIZONTAL_PADDING, BLUE_FONT_COLOR, fonts } from '../constants/styles';

interface IProps {
    balance: number;
    currency: string;
}

export class Balance extends React.PureComponent<IProps> {
    render() {
        const { balance, currency } = this.props;

        return (
            <View style={styles.root}>
                <Text style={styles.caption}>Баланс</Text>

                <View style={styles.balance}>
                    <Text style={styles.balanceText}>{addThinSpaces(balance)} </Text><Text style={styles.currencyText}>{currency}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        paddingHorizontal: BASE_HORIZONTAL_PADDING,
        paddingBottom: 8,
    },
    caption: {
        ...fonts.base,
    },
    balance: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    balanceText: {
        fontSize: 40,
        color: BLUE_FONT_COLOR,
    },
    currencyText: {
        fontSize: 26,
        marginBottom: 3,
        color: BLUE_FONT_COLOR,
    },
});
