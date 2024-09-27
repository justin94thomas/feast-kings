import { combineReducers } from 'redux';
import restaurantReducer from './restaurantReducer';
import userReducer from './userReducer';

export default combineReducers({
    restaurant: restaurantReducer,
    user: userReducer
});
