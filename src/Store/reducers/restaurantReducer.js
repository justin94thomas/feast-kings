import {
    FETCH_RESTAURANTS,
    SELECTED_RESTAURANT,
    GO_TO_LIST,
    CART_ADD_ITEM,
    CART_INCREMENT_ITEM,
    CART_DECREMENT_ITEM,
    CART_REMOVE_ITEM,
    TRACK_ORDER
} from '../actions/restaurantAction';

const initialState = {
    restaurants: [],
    selectedRestaurant: null,
    cart: [],
    view: "Dashboard",
    orderDetails: []

};


export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_RESTAURANTS:
            return { ...state, restaurants: action.payload };
        case SELECTED_RESTAURANT:
            return { ...state, selectedRestaurant: action.payload, view: "Menu" }
        case GO_TO_LIST:
            return { ...state, view: action.payload };
        case CART_ADD_ITEM:
            return { ...state, cart: [...state.cart, action.payload] };
        case CART_INCREMENT_ITEM:
            return {
                ...state, cart: state.cart.map(item =>
                    item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item),
            };
        case CART_DECREMENT_ITEM:
            return {
                ...state, cart: state.cart.map(item =>
                    item.id === action.payload ? { ...item, quantity: item.quantity - 1 } : item
                ),
            };
        case CART_REMOVE_ITEM:
            return { ...state, cart: state.cart.filter(item => item.id !== action.payload) };
        case TRACK_ORDER:
            const newOrder = {
                orderId: action.payload.orderId,
                items: [...state.cart],
                totalAmount: action.payload.total,
            };
            return {
                ...state,
                orderDetails: [...state.orderDetails, newOrder],
                cart: [],
            };
        default:
            return state;
    }
}
