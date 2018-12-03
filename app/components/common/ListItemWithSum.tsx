import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as styleConstants from '../../constants/styles';
import { fonts } from '../../constants/styles';
import { ListItem } from './ListItem';
import { addThinSpaces } from '../../helpers/string';

interface IProps {
    text: string;
    sum: number;
    currency: string;
    circleColor?: string;
    textColor?: string;
    plusSign?: boolean;
    lineColor?: string;
    lineWidth?: number;
}

export class ListItemWithSum extends React.PureComponent<IProps> {
    render() {
        const { text, sum, currency, circleColor, textColor, plusSign, lineColor, lineWidth } = this.props;

        const sumTextStyle: any = [ styles.sumText ];
        const currencyTextStyle: any = [ styles.currencyText ];
        if (textColor) {
            sumTextStyle.push({ color: textColor });
            currencyTextStyle.push({ color: textColor });
        }

        return (
            <ListItem text={text} circleColor={circleColor} lineColor={lineColor} lineWidth={lineWidth}>
                <View style={styles.sum}>
                    <Text style={sumTextStyle}>{plusSign ? ' +\u2009' : ''}{addThinSpaces(sum)}</Text>
                    <Text style={currencyTextStyle}>{currency}</Text>
                </View>
            </ListItem>
        );
    }
}

const styles = StyleSheet.create({
    sum: {
        position: 'absolute',
        top: 15,
        right: styleConstants.BASE_HORIZONTAL_PADDING,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
    },
    sumText: {
        ...fonts.base,
    },
    currencyText: {
        ...fonts.base,
        paddingLeft: 3,
    },
});
