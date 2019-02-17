import * as React from 'react';
import { IActions } from '../actions';
import { StyleSheet, View, Text } from 'react-native';
import * as styleConstants from '../constants/styles';
import { Arrow } from './common/Arrow';
import { fonts, monthSwitcher } from '../constants/styles';
import { IPeriod } from '../types';
const moment = require('moment');
import { DATE_FORMAT } from '../constants/formats';
import { formatRange } from '../helpers/date';

interface IProps {
    period: IPeriod;
    actions: IActions;
}

export class MonthSwitcher extends React.PureComponent<IProps> {
    render() {
        const { period } = this.props;

        const startDate = moment(period.startDate, DATE_FORMAT).startOf('day');
        const endDate = moment(period.endDate, DATE_FORMAT).endOf('day');
        const periodName = formatRange(startDate, endDate);

        return (
            <View style={s.container}>
                <Arrow height={monthSwitcher.height} left={true} onPress={this.previousMonth} />

                <Text style={s.text}>{periodName}</Text>

                <Arrow height={monthSwitcher.height} onPress={this.nextMonth} />
            </View>
        );
    }

    previousMonth = () => {
        const { period, actions } = this.props;
        const startDate = moment(period.startDate, DATE_FORMAT)
            .startOf('month')
            .subtract(1, 'day')
            .startOf('month');
        const endDate = moment(startDate).endOf('month');
        actions.setRange(startDate.format(DATE_FORMAT), endDate.format(DATE_FORMAT));
    };

    nextMonth = () => {
        const { period, actions } = this.props;
        const startDate = moment(period.startDate, DATE_FORMAT)
            .endOf('month')
            .add(1, 'day');
        const endDate = moment(startDate).endOf('month');
        actions.setRange(startDate.format(DATE_FORMAT), endDate.format(DATE_FORMAT));
    };
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
