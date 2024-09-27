import { FETCH_USER } from '../actions/userAction';

const initialState = {
    user: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_USER:
            return {
                ...state,
                user: action.payload,
            };
        default:
            return state;
    }
}
