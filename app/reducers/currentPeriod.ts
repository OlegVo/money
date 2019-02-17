import { IAppState } from '../types';
import { SET_RANGE } from '../actions/types';
import { ISetRangeAction } from '../actions/actions';

const PERIOD = { startDate: '01.01.2019', endDate: '31.01.2019' };

function setRange(action: ISetRangeAction): IAppState['currentPeriod'] {
    return {
        startDate: action.startDate,
        endDate: action.endDate,
    };
}

const reducer = (state: IAppState['currentPeriod'] = PERIOD, action): IAppState['currentPeriod'] => {
    switch (action.type) {
        case SET_RANGE:
            return setRange(action);

        default:
            return state;
    }
};

export default reducer;
