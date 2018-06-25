import { IExpense, IIncome } from '../interfaces';
import { Moment } from 'moment';
import moment = require('moment');
import * as formats from '../constants/formats';

export function filterExpensesByDates(expenses: IExpense[], startDate: Moment, endDate: Moment) {
    return expenses.filter((e) => {
        const date = moment(e.date, formats.DATE_FORMAT);
        return date.valueOf() >= startDate.valueOf() && date.valueOf() <= endDate.valueOf();
    });
}

export function filterIncomesByDates(incomes: IIncome[], startDate: Moment, endDate: Moment) {
    return incomes.filter((t) => {
        const date = moment(t.date, formats.DATE_FORMAT);
        return date.valueOf() >= startDate.valueOf() && date.valueOf() <= endDate.valueOf();
    });
}
