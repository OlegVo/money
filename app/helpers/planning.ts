import { IMonthPlan, IPlanning } from '../interfaces';
import { Moment } from 'moment';

export function getMonthPlan(planning: IPlanning, date: Moment): IMonthPlan | undefined {
    const monthString = date.format('MM.YYYY');
    return planning.monthPlans.find(p => p.month === monthString);
}
