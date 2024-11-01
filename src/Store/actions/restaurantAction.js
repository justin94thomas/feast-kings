import RestaurantData from '../../Setup/restaurants.json';
export const FETCH_RESTAURANTS = 'FETCH_RESTAURANTS';
export const SELECTED_RESTAURANT = 'SELECTED_RESTAURANT';
export const GO_TO_LIST = 'GO_TO_LIST';
export const CART_ADD_ITEM = 'CART_ADD_ITEM';
export const CART_INCREMENT_ITEM = 'CART_INCREMENT_ITEM';
export const CART_DECREMENT_ITEM = 'CART_DECREMENT_ITEM';
export const CART_REMOVE_ITEM = 'CART_REMOVE_ITEM';
export const TRACK_ORDER = 'TRACK_ORDER';

export const fetchRestaurants = () => {
    return async (dispatch) => {
        const restaurants = RestaurantData;
        dispatch({
            type: FETCH_RESTAURANTS,
            payload: restaurants,
        });
    };
};
export const showHide = (selected) => {
    return async (dispatch, getState) => {
        try {
            const state = getState();
            const restaurants = state.restaurant.restaurants;
            const updatedRestaurants = restaurants.map(restaurant => {
                if (restaurant.id === selected.id) {
                    return {
                        ...restaurant, display: !restaurant?.display,
                    };
                } else {
                    return {
                        ...restaurant, display: false,
                    };
                }
            });
            dispatch({
                type: FETCH_RESTAURANTS,
                payload: updatedRestaurants,
            });
        } catch (error) {
            console.error('Error in showHide action:', error);
        }
    };
};
export const selectResaurant = (selected) => {
    return async (dispatch) => {
        dispatch({
            type: SELECTED_RESTAURANT,
            payload: selected
        });
    };
};
export const goToList = () => {
    return async (dispatch) => {
        dispatch({
            type: GO_TO_LIST,
            payload: 'Dashboard'
        });
    };
};
export const goToMenu = () => {
    return async (dispatch) => {
        dispatch({
            type: GO_TO_LIST,
            payload: 'Menu'
        });
    };
};
export const goToCheckout = () => {
    return async (dispatch) => {
        dispatch({
            type: GO_TO_LIST,
            payload: 'Checkout'
        });
    };
};
export const addToCart = (selected, item, actionType) => {
    return async (dispatch, getState) => {
        try {
            const state = getState();
            const restaurants = state.restaurant.restaurants;
            const updatedRestaurants = restaurants.map(restaurant => {
                if (restaurant.id === selected.id) {
                    let updatedMenu = restaurant.menu.map(menu => {
                        if (menu.id === item.id) {
                            const newQuantity = actionType === "INC"
                                ? menu.quantity + 1
                                : menu.quantity > 0 ? menu.quantity - 1 : 0;
                            return { ...menu, quantity: newQuantity };
                        } else {
                            return { ...menu };
                        }
                    });
                    return { ...restaurant, menu: updatedMenu };
                } else {
                    return { ...restaurant };
                }
            });
            dispatch({ type: FETCH_RESTAURANTS, payload: updatedRestaurants });
            const cartItem = { ...item, restaurantId: selected.id };
            const existingCartItem = state.restaurant.cart.find(cartItem => cartItem.id === item.id);
            if (actionType === "INC") {
                if (existingCartItem) {
                    dispatch({ type: CART_INCREMENT_ITEM, payload: item.id });
                } else {
                    dispatch({ type: CART_ADD_ITEM, payload: { ...cartItem, quantity: 1 } });
                }
            } else if (actionType === "DEC") {
                if (existingCartItem) {
                    if (existingCartItem.quantity > 1) {
                        dispatch({ type: CART_DECREMENT_ITEM, payload: item.id });
                    } else {
                        dispatch({ type: CART_REMOVE_ITEM, payload: item.id });
                    }
                }
            }
        } catch (error) {
            console.error('Error in addToCart action:', error);
        }
    };
};
export const moveToTrack = (total, orderId) => {
    return async (dispatch) => {
        dispatch({ type: GO_TO_LIST, payload: 'Track' });
        dispatch({ type: TRACK_ORDER, payload: { total, orderId } })
    };
}

export const viewTrack = () => {
    return async (dispatch) => {
        dispatch({ type: GO_TO_LIST, payload: 'Track' });
    };
}


