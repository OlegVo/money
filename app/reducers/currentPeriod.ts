import { IAppState } from '../types';
import { SET_RANGE } from '../actions/types';
import { ISetRangeAction } from '../actions/actions';

function setRange(action: ISetRangeAction): IAppState['currentPeriod'] {
    return {
        startDate: action.startDate,
        endDate: action.endDate,
    };
}

const reducer = (state: IAppState['currentPeriod'] = null, action): IAppState['currentPeriod'] => {
    switch (action.type) {
        case SET_RANGE:
            return setRange(action);

        default:
            return state;
    }
};

export default reducer;
