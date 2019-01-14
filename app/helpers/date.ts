import { Moment } from 'moment';
import * as formats from '../constants/formats';
import { capitalize } from './string';
const moment = require('moment');

export function formatRange(start: Moment, end: Moment) {
    if (start.format('M.Y') === end.format('M.Y')) {
        if (start.format('D') === '1' && end.format('D') === end.endOf('month').format('D')) {
            // Май 2018
            return capitalize(start.format('MMMM YYYY'));
        }

        // 1 - 31 мая 2018
        return `${start.format('D')} - ${end.format('LL')}`;
    }

    // 1 апреля 2018 - 31 мая 2018
    return `${start.format('LL')} - ${end.format('LL')}`;
}

export function getStartAndEndOfMonth(month: string) {
    const date = moment(`01.${month}`, formats.DATE_FORMAT).startOf('month');
    return {
        startDate: date,
        endDate: moment(date).endOf('month'),
    };
}
