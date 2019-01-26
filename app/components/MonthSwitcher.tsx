import * as React from 'react';
import { IActions } from '../actions';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import * as styleConstants from '../constants/styles';
import { Arrow } from './common/Arrow';
import { fonts, monthSwitcher } from '../constants/styles';

interface IProps {
    actions: IActions;
}

export class MonthSwitcher extends React.PureComponent<IProps> {
    render() {
        return (
            <View style={s.container}>
                <Arrow height={monthSwitcher.height} left={true} onPress={this.previousMonth} />

                <Text style={s.text}>Январь</Text>

                <Arrow height={monthSwitcher.height} onPress={this.nextMonth} />
            </View>
        );
    }

    previousMonth = () => {};

    nextMonth = () => {};
}

const s = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // paddingVertical: styleConstants.LIST_VERTICAL_PADDING,
        paddingHorizontal: styleConstants.BASE_HORIZONTAL_PADDING,
        borderTopWidth: 1,
        borderColor: styleConstants.LIST_BORDER_COLOR,
    },
    text: {
        ...fonts.base,
        lineHeight: monthSwitcher.height,
    },
});
