import { Moment } from 'moment';

export function formatRange(start: Moment, end: Moment) {
    // 1 - 31 мая 2018
    if (start.format('M.Y') === end.format('M.Y')) {
        return `${start.format('D')} - ${end.format('LL')}`;
    }

    // 1 апреля 2018 - 31 мая 2018
    return `${start.format('LL')} - ${end.format('LL')}`;
}
