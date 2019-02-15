import { IPlanning } from '../types';
import { ISetPlans } from '../actions/actions';
import { SET_PLANS } from '../actions/types';

function setPlans(action: ISetPlans): IPlanning {
    return action.planning;
}

const reducer = (state: IPlanning = { monthPlans: [] }, action): IPlanning => {
    switch (action.type) {
        case SET_PLANS:
            return setPlans(action);

        default:
            return state;
    }
};

export default reducer;
