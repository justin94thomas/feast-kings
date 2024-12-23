import userData from '../../Setup/user.json';
export const FETCH_USER = 'FETCH_USER';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const fetchUser = () => {
    return async (dispatch) => {
        const user = userData;

        dispatch({
            type: FETCH_USER,
            payload: user,
        });
    };
};
