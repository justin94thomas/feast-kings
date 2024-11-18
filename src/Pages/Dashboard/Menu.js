import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../Store/actions/restaurantAction';

export default function Menu({ selected }) {
    const dispatch = useDispatch();
    // const restaurants = useSelector(state => state.restaurant.restaurants);
    const cart = useSelector(state => state.restaurant.cart);

    const handleAddToCart = (restaurant, item, actionType) => {
        dispatch(addToCart(restaurant, item, actionType));
    };
    const updatedMenu = useMemo(() => {
        if (cart.length > 0) {
            return selected.menu.map(menuItem => {
                const cartItem = cart.find(cartItem => cartItem.id === menuItem.id);
                return cartItem ? { ...menuItem, quantity: cartItem.quantity } : menuItem;
            });
        }
        return selected.menu;
    }, [cart, selected.menu]);

    return (
        <View>
            {selected && updatedMenu.map(menuItem => (
                <View style={styles.card} key={menuItem.id}>
                    <View style={styles.cardMain}>
                        <View style={styles.cardLeft}>
                            <View style={{ flex: 1, flexDirection: 'row', gap: 4 }}>
                                <MaterialIcons name={menuItem.veg ? "spa" : "pets"} size={20} color={menuItem.veg ? 'green' : "#FF6969"} />
                                {menuItem?.bestseller && <Text style={styles.bestseller}>Bestseller</Text>}
                            </View>
                            <Text style={styles.productTitle}>{menuItem.name}</Text>
                            <Text style={styles.price}>₹{menuItem.price}</Text>
                            <View style={styles.ratingRow}>
                                <MaterialIcons name="star" size={16} color="green" />
                                <Text style={styles.rating}>{menuItem.rating} ({menuItem.people})</Text>
                            </View>
                        </View>
                        <View style={styles.quantityControls}>
                            {menuItem.quantity === 0 ? (
                                <TouchableOpacity style={styles.quantityDisplay} onPress={() => handleAddToCart(selected, menuItem, "INC")}>
                                    <Text style={styles.addButtonText}>ADD</Text>
                                </TouchableOpacity>
                            ) : (
                                <View style={styles.quantityDisplay}>
                                    <TouchableOpacity onPress={() => handleAddToCart(selected, menuItem, "DEC")} disabled={menuItem.quantity === 0}>
                                        <Text style={styles.controlButton}>-</Text>
                                    </TouchableOpacity>
                                    <Text style={styles.qtyText}>{menuItem.quantity}</Text>
                                    <TouchableOpacity onPress={() => handleAddToCart(selected, menuItem, "INC")}>
                                        <Text style={styles.controlButton}>+</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                    </View>
                    {menuItem.description && <Text style={styles.description}>{menuItem.description}</Text>}
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
        marginTop: 10
    },
    cardMain: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardLeft: {
        flexDirection: 'column',
        width: '70%'
    },
    bestseller: {
        color: '#FF6969',
        fontWeight: 'bold',
        marginTop: 5,
    },
    productTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 5,

    },
    price: {
        fontSize: 16,
        color: '#333',
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    rating: {
        marginLeft: 5,
        color: '#555',
    },
    quantityControls: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    controlButton: {
        fontSize: 24,
        paddingHorizontal: 10,
        color: 'green',
    },
    qtyText: {
        fontWeight: 'bold',
        fontSize: 16,
        paddingHorizontal: 10,
    },
    addButtonText: {
        fontSize: 16,
        color: 'green',
        fontWeight: 'bold',
        paddingHorizontal: 10,
    },
    quantityDisplay: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 90,
        justifyContent: 'center',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        height: 38
    },
    description: {
        marginTop: 5,
        color: 'grey'
    },
});
