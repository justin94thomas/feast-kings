import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Switch, TextInput, TouchableOpacity } from 'react-native';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { goToList, goToCheckout } from '../../Store/actions/restaurantAction';
import Menu from './Menu';

export default function Preview() {
    const dispatch = useDispatch();
    const selected = useSelector((state) => state.restaurant.selectedRestaurant)
    const cart = useSelector((state) => state.restaurant.cart)
    const [veg, setVeg] = React.useState(false);
    const [nonVeg, setNonVeg] = React.useState(false);

    const toggleVeg = () => {
        setVeg(previousState => !previousState);
        if (!veg) setNonVeg(false);
    };

    const toggleNonVeg = () => {
        setNonVeg(previousState => !previousState);
        if (!nonVeg) setVeg(false);
    };

    const checkCart = Array.isArray(cart) ? cart.reduce((total, item) => total + item.quantity, 0) : 0;

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.content}>
                    <Feather name="arrow-left" size={20} color="black" onPress={() => dispatch(goToList())} />
                </View>
                <View style={[styles.section2, { backgroundColor: 'white' }]}>
                    <View style={styles.restaurantDetails}>
                        <Text style={styles.restaurantName}>{selected?.name}</Text>
                        <Text style={styles.addressText} numberOfLines={1}>{selected.deliveryTime} | {selected.distance} KM | {selected.location}</Text>
                        <Text style={styles.cuisineText}>{selected?.cuisine}</Text>
                    </View>
                    <View style={styles.ratingsMain}>
                        <MaterialIcons name="star" size={16} color="green" />
                        <Text style={styles.locationText}>{selected?.rating}</Text>
                    </View>
                </View>
                <View style={styles.content2}>
                    {/* Menu */}
                    <View style={styles.menuMain}>
                        <Feather name="slack" size={18} color="grey" />
                        <Text style={styles.menuText}>Menu</Text>
                        <Feather name="slack" size={18} color="grey" />
                    </View>
                    <View style={styles.searchBar}>
                        <TextInput
                            placeholder="Search for dishes"
                            style={styles.searchInput}
                        />
                        <TouchableOpacity>
                            <Feather name="search" size={24} color="orange" />
                        </TouchableOpacity>
                    </View>
                    {/* Filter */}
                    <View style={styles.filterRow}>
                        <View style={styles.filterItem}>
                            <Switch value={veg}
                                onValueChange={toggleVeg}
                                thumbColor={veg ? "green" : "#f4f3f4"}
                                trackColor={{ false: "#767577", true: "#C6EBC5" }}
                            />
                            <Text>Veg</Text>
                        </View>
                        <View style={styles.filterItem}>
                            <Switch value={nonVeg}
                                onValueChange={toggleNonVeg}
                                style={styles.nonvegSwitch}
                                thumbColor={nonVeg ? "red" : "#f4f3f4"}
                                trackColor={{ false: "#767577", true: "#ff9999" }}
                            />
                            <Text>Non-Veg</Text>
                        </View>
                    </View>
                    {/* Menu List */}
                    <Menu selected={selected} />
                </View>
            </ScrollView>
            {checkCart !== 0 && (
                <TouchableOpacity style={styles.viewCartMain} onPress={() => dispatch(goToCheckout())}>
                    <Text style={styles.cartText}>{checkCart} Item added</Text>
                    <Text style={styles.cartText}>{`View Cart >`}</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        flexDirection: 'row',
        gap: 10,
        paddingHorizontal: 16,
        paddingTop: 50,
    },
    section2: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        padding: 14,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    restaurantName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    cuisineText: {
        fontSize: 12,
        fontWeight: '300',
    },
    content2: {
        margin: 0,
        marginTop: 10,
        padding: 20,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    menuText: {
        fontSize: 14,
        fontWeight: '500',
        paddingLeft: 8,
        paddingRight: 8,
    },
    menuMain: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 8,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
        padding: 10,
        backgroundColor: '#f1f1f1',
        borderRadius: 10,
    },
    searchInput: {
        flex: 1,
    },
    filterRow: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    filterItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    viewCartMain: {
        position: 'absolute',
        bottom: 20,
        width: '92%',
        height: 50,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
        paddingHorizontal: 16,
        backgroundColor: 'green',
    },
    cartText: {
        fontWeight: 'bold',
        fontSize: 14,
        color: '#fff',
    },
});
