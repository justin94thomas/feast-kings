import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { MaterialIcons, FontAwesome, Feather } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRestaurants } from '../../Store/actions/restaurantAction';
import { fetchUser } from '../../Store/actions/userAction';
import RestaurantList from './Lists';



export default function Dashboard() {
    const dispatch = useDispatch();
    const userData = useSelector(state => state.user)
    const restaurants = useSelector(state => state.restaurant.restaurants)
    const [user, setUser] = useState({});
    const [delivery, setDelivery] = useState({});

    useEffect(() => {
        dispatch(fetchRestaurants());
        dispatch(fetchUser());
    }, [dispatch]);

    useEffect(() => {
        if (Array.isArray(userData?.user)) {
            let currentUser = userData.user[0];
            let currentAddress = currentUser?.address?.filter(item => item?.type === currentUser?.current);
            setUser(currentUser);
            setDelivery(currentAddress?.[0]);
        }
    }, [userData]);

    return (
        <ScrollView>
            <View style={[styles.container, { backgroundColor: 'white' }]}>
                <View style={styles.header}>
                    <View style={styles.locationWrapper}>
                        <MaterialIcons name="location-on" size={24} color="orange" />
                        <View style={styles.locationDiv}>
                            <Text style={styles.locationText}>{delivery?.name}</Text>
                            <Text style={styles.addressText} numberOfLines={1}>{delivery?.addressLine1}, {delivery?.addressLine2}</Text>
                        </View>
                    </View>
                    <TouchableOpacity>
                        <FontAwesome name="user-circle-o" size={24} color="black" />
                    </TouchableOpacity>
                </View>
                {/* Search Bar */}
                <View style={styles.searchBar}>
                    <TextInput
                        placeholder="Search for 'Onam Special'"
                        style={styles.searchInput}
                    />
                    <TouchableOpacity>
                        <Feather name="mic" size={24} color="orange" />
                    </TouchableOpacity>
                </View>
            </View>
            {/* Promo Banner */}
            <View style={styles.banner}>
                <Text style={styles.bannerTitle}>It’s snack time</Text>
                <Text style={styles.bannerSubtitle}>Get delicious munchies & enjoy!</Text>
                <TouchableOpacity style={styles.orderNowButton}>
                    <Text style={styles.orderNowText}>ORDER NOW</Text>
                </TouchableOpacity>
            </View>
            {/* Filters */}
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 10 }}
            >
                <View style={styles.filters}>
                    <TouchableOpacity style={styles.filterButton}>
                        <Text>Pure Veg</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.filterButton}>
                        <Text>Less than Rs. 300</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.filterButton}>
                        <Text>Less than 5 KM</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.filterButton}>
                        <Text>Ratings</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            {/* Restaurant Listings */}
            <Text style={styles.sectionTitle}>Restaurants to explore</Text>
            {/* Placeholder for the restaurant listings */}
            <RestaurantList data={restaurants} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingBottom: 16,
        paddingTop: 50
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
    },
    locationWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    locationDiv: {
        width: '70%',
        flexWrap: 'wrap',
    },
    locationText: {
        marginLeft: 5,
        fontWeight: 'bold',
        fontSize: 20,
    },
    addressText: {
        color: 'gray',
        marginLeft: 5,
        marginTop: 5,
        width: 200,
        flexWrap: 'wrap',
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
    banner: {
        backgroundColor: '#e0f7fa',
        padding: 20,
        marginTop: 20,
        borderRadius: 10,
    },
    bannerTitle: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    bannerSubtitle: {
        marginTop: 5,
    },
    orderNowButton: {
        backgroundColor: '#00796b',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    orderNowText: {
        color: '#fff',
        textAlign: 'center',
    },
    filters: {
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
        marginTop: 20,
        marginLeft: 8,
        marginBottom: 3
    },
    filterButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 30,
        paddingVertical: 8,
        paddingHorizontal: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    sectionTitle: {
        marginTop: 20,
        marginLeft: 8,
        fontWeight: 'bold',
        fontSize: 18,
    },
});