import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import * as styleConstants from '../constants/styles';
import * as moment from 'moment';
import { Moment } from 'moment';
import { fonts, MAIN_BACKGROUND_COLOR } from '../constants/styles';
import { monthSwitcher } from '../constants/styles';
import { Arrow } from './common/Arrow';
import { DATE_FORMAT, MONTH_FORMAT } from '../constants/formats';
const window = Dimensions.get('window');

const DAY_SIZE = (window.width - 20) / 7;

const WEEK_DAYS = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

interface IProps {
    date: string;
    onSelectDate: (date: Moment) => void;
}

interface IState {
    date: Moment;
    month: string;
}

export class DatePicker extends React.PureComponent<IProps, IState> {
    constructor(props) {
        super(props);

        this.onPressDate = this.onPressDate.bind(this);
        const date = moment(props.date, DATE_FORMAT);

        this.state = {
            date,
            month: date.format(MONTH_FORMAT),
        };
    }

    onPressDate(day) {
        const { month } = this.state;

        const newDate = moment(month, MONTH_FORMAT);
        newDate.date(day);

        this.setState({ date: newDate });

        this.props.onSelectDate(newDate);
    }

    previousMonth = () => {
        const { month } = this.state;
        const prevMonth = moment(month, MONTH_FORMAT)
            .startOf('month')
            .subtract(1, 'day')
            .format(MONTH_FORMAT);
        this.setState({ month: prevMonth });
    };

    nextMonth = () => {
        const { month } = this.state;
        const nextMonth = moment(month, MONTH_FORMAT)
            .endOf('month')
            .add(1, 'day')
            .format(MONTH_FORMAT);
        this.setState({ month: nextMonth });
    };

    render() {
        const { date, month } = this.state;

        const monthDay = date.date();

        const monthDays: any[] = [];
        const firstDayOfMonth = moment(month, MONTH_FORMAT).date(1);
        const firstDayOfMonthWeekDay = firstDayOfMonth.day() || 7; // делаем пн - 1, вс - 7
        // считать надо до дня недели первого дня в месяце
        for (let i = 1; i < firstDayOfMonthWeekDay; i++) {
            monthDays.push('');
        }
        for (let i = 1; i <= firstDayOfMonth.daysInMonth(); i++) {
            monthDays.push(i);
        }

        let monthLabel = moment(month, MONTH_FORMAT).format('MMMM YYYY');
        monthLabel = monthLabel.charAt(0).toUpperCase() + monthLabel.slice(1);

        const today = moment();

        return (
            <View style={styles.container}>
                <View style={styles.month}>
                    <View style={styles.weekDays}>
                        {WEEK_DAYS.map((weekDay, i) => (
                            <View key={i} style={styles.weekDay}>
                                <Text style={styles.weekDayText}>{weekDay}</Text>
                            </View>
                        ))}
                    </View>

                    <View style={styles.monthLabel}>
                        <Arrow height={monthSwitcher.height} left={true} onPress={this.previousMonth} />

                        <Text style={styles.monthLabelText}>{monthLabel}</Text>

                        {date.format(MONTH_FORMAT) !== month && firstDayOfMonth.diff(date) < 0 && (
                            <Arrow height={monthSwitcher.height} onPress={this.nextMonth} />
                        )}
                    </View>

                    <View style={styles.monthDays}>
                        {monthDays.map((day, i) => {
                            const dayStyle = [styles.day];
                            const daytTextStyle = [styles.dayText];
                            if (date.format(MONTH_FORMAT) === month && day === monthDay) {
                                dayStyle.push(styles.dayCurrent);
                                daytTextStyle.push(styles.dayTextCurrent);
                            } else if ((date.format(MONTH_FORMAT) === month && day > today.date()) || firstDayOfMonth.diff(date) > 0) {
                                daytTextStyle.push(styles.dayTextDisabled);
                            }

                            return (
                                <TouchableOpacity
                                    key={i}
                                    style={dayStyle}
                                    onPress={() => this.onPressDate(day)}
                                    activeOpacity={styleConstants.TOUCHABLE_ACTIVE_OPACITY}
                                >
                                    {!!day && <Text style={daytTextStyle}>{day}</Text>}
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    month: {
        width: window.width,
    },
    weekDays: {
        paddingVertical: 10,
        paddingLeft: 10,
        backgroundColor: styleConstants.GRAY_BACKGROUND_COLOR,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    weekDay: {
        width: DAY_SIZE,
    },
    weekDayText: {
        fontSize: 14,
        color: '#444',
        textAlign: 'center',
    },
    monthLabel: {
        paddingHorizontal: styleConstants.BASE_HORIZONTAL_PADDING,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: styleConstants.LIST_BORDER_COLOR,
        alignItems: 'center',
    },
    monthLabelText: {
        ...fonts.base,
        lineHeight: monthSwitcher.height,
    },
    monthDays: {
        paddingVertical: 8,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
    },
    day: {
        width: DAY_SIZE,
        height: DAY_SIZE,
    },
    dayCurrent: {
        borderRadius: DAY_SIZE / 2,
        // backgroundColor: styleConstants.MAIN_BACKGROUND_COLOR,
        backgroundColor: '#FF8B00',
    },
    dayText: {
        textAlign: 'center',
        lineHeight: DAY_SIZE,
        ...fonts.base,
        backgroundColor: 'transparent',
    },
    dayTextCurrent: {
        color: MAIN_BACKGROUND_COLOR,
    },
    dayTextDisabled: {
        color: styleConstants.GRAY_FONT_COLOR,
    },
});
