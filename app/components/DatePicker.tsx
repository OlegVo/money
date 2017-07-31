import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import * as styleConstants from '../constants/styles';
import * as moment from 'moment';

const window = Dimensions.get('window');

const DAY_SIZE = (window.width - 20) / 7;

const WEEK_DAYS = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

export class DatePicker extends React.Component<any, any> {
    // static propTypes = {
    //     date: PropTypes.string.isRequired,
    //     onSelectDate: PropTypes.func.isRequired,
    // };

    constructor(props) {
        super(props);

        this.onPressDate = this.onPressDate.bind(this);

        this.state = {
            date: moment(props.date, 'DD.MM.YYYY'),
        };
    }

    onPressDate(day) {
        const { date } = this.state;

        const newDate = moment(date);
        newDate.date(day);

        this.setState({date: newDate});

        this.props.onSelectDate(newDate);
    }

    render() {
        const { date } = this.state;

        const monthDay = date.date();

        const month: any[] = [];
        const firstDayOfMonth = moment(date).date(1);
        const firstDayOfMonthWeekDay = firstDayOfMonth.day()
        // считать надо до дня недели первого дня в месяце
        for (let i = 1; i < firstDayOfMonthWeekDay; i++) {
            month.push('');
        }
        for (let i = 1; i <= date.daysInMonth(); i++) {
            month.push(i);
        }

        let monthLabel = date.format('MMMM YYYY')
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
                        <Text style={styles.monthLabelText}>{monthLabel}</Text>
                    </View>

                    <View style={styles.monthDays}>
                        {month.map((day, i) => {
                            const dayStyle = [styles.day];
                            const daytTextStyle = [styles.dayText];
                            if (day === monthDay) {
                                dayStyle.push(styles.dayCurrent);
                                daytTextStyle.push(styles.dayTextCurrent);
                            } else if (day > today.date()) {
                                daytTextStyle.push(styles.dayTextDisabled);
                            }

                            return (
                                <TouchableOpacity
                                    key={i}
                                    style={dayStyle}
                                    onPress={() => this.onPressDate(day)}
                                    activeOpacity={styleConstants.TOUCHABLE_ACTIVE_OPACITY}
                                >
                                    {!!day &&
                                        <Text style={daytTextStyle}>{day}</Text>
                                    }
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
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: styleConstants.LIST_BORDER_COLOR,
    },
    monthLabelText: {
        fontSize: styleConstants.BASE_FONT_SIZE,
        color: styleConstants.BASE_FONT_COLOR,
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
        fontSize: styleConstants.BASE_FONT_SIZE,
        color: styleConstants.BASE_FONT_COLOR,
        backgroundColor: 'transparent',
    },
    dayTextCurrent: {
        color: '#fff',
    },
    dayTextDisabled: {
        color: styleConstants.GRAY_FONT_COLOR,
    },
});
