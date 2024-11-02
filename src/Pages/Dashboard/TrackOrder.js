import React, { useEffect, useState } from 'react';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { goToList } from '../../Store/actions/restaurantAction';
import * as Location from 'expo-location';
import { GOOGLE_MAPS_API_KEY } from '../../Setup/constants';
import axios from 'axios';
import Delivery from '../../Assets/Images/Bike.png';
import PolylineLib from '@mapbox/polyline';

const { width, height } = Dimensions.get('window');

const restaurantLocation = {
    latitude: 10.401120,
    longitude: 76.340759,
    latitudeDelta: 2,
    longitudeDelta: 2,
};

export default function TrackOrder() {
    const dispatch = useDispatch();
    const [userLocation, setUserLocation] = useState(null);
    const [routeCoordinates, setRouteCoordinates] = useState([]);
    const [orderDelay, setOrderDelay] = useState(false);
    const orderDetails = useSelector(state => state.restaurant.orderDetails);
    const [routeMap, setRouteMap] = useState(null);
    useEffect(() => {
        (async function fetchData() {
            try {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    console.log('Permission to access location was denied');
                    return;
                }
                // Get current location
                let currentLocation = await Location.getCurrentPositionAsync({});
                let currentLatitude = currentLocation.coords.latitude;
                let currentLongitude = currentLocation.coords.longitude;
                // This is for google cloud - Route for creating route from 
                const response = await axios.get(`https://maps.googleapis.com/maps/api/directions/json?origin=${restaurantLocation.latitude},${restaurantLocation.longitude}&destination=${currentLatitude},${currentLongitude}&key=${GOOGLE_MAPS_API_KEY}`);
                // const points = PolylineLib.decode(response.data.routes[0].overview_polyline.points);
                // const routeCoords = points.map(point => ({
                //     latitude: point[0],
                //     longitude: point[1],
                // }));
                // setRouteCoordinates(routeCoords);
                const routeMap = [
                    { latitude: 10.400873, longitude: 76.341851 },
                    { latitude: 10.400892, longitude: 76.341970 },
                    { latitude: 10.400538, longitude: 76.342007 },
                    { latitude: 10.400443, longitude: 76.342335 },
                    { latitude: 10.400396, longitude: 76.342579 },
                    { latitude: 10.400332, longitude: 76.343411 },
                    { latitude: 10.400151, longitude: 76.346138 },
                    { latitude: 10.400314, longitude: 76.346991 },
                    { latitude: 10.400541, longitude: 76.347339 },
                    { latitude: 10.400417, longitude: 76.348267 },
                    { latitude: 10.400179, longitude: 76.348884 },
                    { latitude: 10.400286, longitude: 76.349707 },
                    { latitude: 10.400847, longitude: 76.350092 },
                    { latitude: 10.401136, longitude: 76.351148 },
                    { latitude: 10.401015, longitude: 76.351690 },
                    { latitude: 10.400791, longitude: 76.353552 },
                    { latitude: 10.400944, longitude: 76.353863 },
                    { latitude: 10.401272, longitude: 76.354438 },
                    { latitude: 10.401372, longitude: 76.355398 },
                    { latitude: 10.402635, longitude: 76.355784 },
                    { latitude: 10.402651, longitude: 76.356015 },
                    { latitude: 10.402316, longitude: 76.357367 },
                    { latitude: 10.402205, longitude: 76.358747 },
                    { latitude: currentLatitude, longitude: currentLongitude },
                ]
                setRouteMap(routeMap)
                setUserLocation({
                    latitude: currentLatitude,
                    longitude: currentLongitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                });
            } catch (error) {
                console.log('Error fetching route:', error);
            }
        })();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.orderInfo}>
                <TouchableOpacity>
                    <MaterialIcons name="close" size={24} color="black" onPress={() => dispatch(goToList())} />
                </TouchableOpacity>
                <View style={styles.orderBox}>
                    <View>
                        <Text style={styles.orderId}>ORDER #{orderDetails && orderDetails[0].orderId}</Text>
                        <Text style={styles.orderDetails}>{orderDetails && `8:21 PM | ${orderDetails[0].items.length} ${orderDetails[0].items.length > 1 ? `items` : `item`}, ₹${orderDetails[0].totalAmount}`}
                        </Text>
                    </View>
                    <Text style={styles.helpText}>HELP</Text>
                </View>
            </View>
            {/* Conditionally render MapView only if initialRegion is available */}
            <ScrollView>
                {userLocation && (
                    <MapView
                        style={styles.map}
                        provider={PROVIDER_GOOGLE}
                        initialRegion={userLocation}
                        zoomEnabled={true}
                        zoomTapEnabled={true}
                        scrollEnabled={true}
                        showsUserLocation
                        showsMyLocationButton
                    >
                        {/* Static Marker for restaurant */}
                        <Marker coordinate={{ latitude: 10.400873, longitude: 76.341851 }}>
                            <MaterialIcons name="restaurant" size={24} color="red" style={styles.restaurantICO} />
                        </Marker>
                        {/* User's location marker */}
                        <Marker coordinate={{ latitude: userLocation.latitude, longitude: userLocation.longitude }}>
                            <MaterialIcons name="home" size={24} color="black" style={styles.HomeICO} />
                        </Marker>
                        {/* Delivery guy marker */}
                        <Marker coordinate={{ latitude: 10.400324, longitude: 76.343354 }}>
                            <View style={styles.BikeContainer}>
                                <Image source={Delivery} style={styles.BikeICO} />
                            </View>
                        </Marker>
                        {/* Optional Polyline for route */}
                        <Polyline
                            coordinates={routeMap}
                            strokeColor="blue"
                            strokeWidth={3}
                        />
                        {/* Google Console Enabled Route */}
                        {/* <Polyline
                        coordinates={routeCoordinates}
                        strokeColor="#1E90FF" // Customize the color
                        strokeWidth={4}
                    /> */}
                    </MapView>
                )}
                <View style={styles.content3}>
                    <Text style={styles.orderId}>Order Summary:</Text>
                    {orderDetails && orderDetails[0]?.items.map((menuItem, index) => {
                        return <View style={styles.flexContent}>
                            <View style={styles.flexContent2}>
                                <MaterialIcons name={menuItem.veg ? "spa" : "pets"} size={20} color={menuItem.veg ? 'green' : "#FF6969"} />
                                <Text>{menuItem.name}</Text>
                                <Text style={{ marginLeft: 10 }}>x {menuItem?.quantity}</Text>
                            </View>
                        </View>
                    })}
                </View>
            </ScrollView>
            <View style={styles.statusContainer}>
                <View style={styles.statusHeader}>
                    <View style={styles.statusIcon}>
                        <Text style={styles.nowText}>NOW</Text>
                    </View>
                    <View style={styles.statusTextContainer}>
                        <Text style={styles.statusTitle}>Order Picked Up</Text>
                        <Text style={styles.statusSubtitle}>Sunil Ahlawat has picked up your order. Tasty food is en route!</Text>
                    </View>
                    <Feather name="phone-call" size={24} color="orange" />
                </View>
                {orderDelay && <Text style={styles.delayText}>
                    Expecting a slight delay in your order due to rains in your area.
                </Text>}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingHorizontal: 0,
        paddingVertical: 50,
    },
    title: {
        padding: 10,
        fontSize: 18,
    },
    map: {
        width: width,
        height: height * 0.6,
    },
    orderInfo: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 10,
        margin: 0,
        borderRadius: 8,
        gap: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 2,
        alignItems: 'center',
    },
    orderBox: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    orderId: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    orderDetails: {
        color: 'gray',
    },
    helpText: {
        color: 'orange',
        fontWeight: 'bold',
        alignItems: 'center',
    },
    statusContainer: {
        position: 'absolute',
        bottom: 0,
        width: width,
        backgroundColor: 'white',
        paddingVertical: 20,
        paddingHorizontal: 15,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    statusHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statusIcon: {
        backgroundColor: '#e6e7e9',
        borderRadius: 5,
        padding: 5,
        marginRight: 10,
    },
    nowText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 12,
    },
    statusTextContainer: {
        flex: 1,
    },
    statusTitle: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    statusSubtitle: {
        color: 'gray',
        marginTop: 3,
    },
    delayText: {
        color: 'red',
        marginTop: 10,
    },
    restaurantICO: {
        borderRadius: 50,
        padding: 5,
        backgroundColor: '#fff',
        marginBottom: 4,
        borderColor: '#000'
    },
    HomeICO: {
        borderRadius: 50,
        padding: 5,
        backgroundColor: '#fff',
        marginBottom: 4,
        borderColor: '#000'
    },
    BikeContainer: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    BikeICO: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    flexContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
        marginTop: 4
    },
    flexContent2: {
        flexDirection: 'row',
    },
    content3: {
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
        borderRadius: 8,
    },
});
