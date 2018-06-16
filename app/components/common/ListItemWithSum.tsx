import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as styleConstants from '../../constants/styles';
import { fonts } from '../../constants/styles';
import { ListItem } from './ListItem';

interface IProps {
    text: string;
    sum: number;
    currency: string;
    circleColor?: string;
}

export class ListItemWithSum extends React.PureComponent<IProps> {
    render() {
        const { text, sum, currency, circleColor } = this.props;

        return (
            <ListItem text={text} circleColor={circleColor}>
                <View style={styles.sum}>
                    <Text style={styles.sumText}>{sum}</Text>
                    <Text style={styles.currencyText}>{currency}</Text>
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
    },
    sumText: {
        ...fonts.base,
    },
    currencyText: {
        ...fonts.base,
        color: styleConstants.LIST_BORDER_COLOR,
        paddingLeft: 3,
    },
});
