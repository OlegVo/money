import { IAppState } from '../types';

const PERIOD = { startDate: '01.01.2019', endDate: '31.01.2019' };

const reducer = (state: IAppState['currentPeriod'] = PERIOD, action): IAppState['currentPeriod'] => {
    switch (action.type) {
        default:
            return state;
    }
};

export default reducer;
