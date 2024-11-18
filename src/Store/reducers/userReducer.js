import { FETCH_USER, LOGIN, LOGOUT } from '../actions/userAction';

const initialState = {
    user: [],
    isAuthenticated: false,
    userRole: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_USER:
            return {
                ...state,
                user: action.payload,
            };
        case LOGIN:
            return {
                ...state,
                isAuthenticated: true,
                userRole: action.payload,
            };
        case LOGOUT:
            return initialState;
        default:
            return state;
    }
}
