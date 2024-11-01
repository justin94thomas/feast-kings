import React, { useEffect, useState } from 'react';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { goToList } from '../../Store/actions/restaurantAction';
import * as Location from 'expo-location';
import { GOOGLE_MAPS_API_KEY } from '../../Setup/constants';
import axios from 'axios';
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
                    <Marker coordinate={{ latitude: 10.4045, longitude: 76.3425 }}>
                        <MaterialIcons name="restaurant" size={24} color="red" style={styles.restaurantICO} />
                    </Marker>
                    {/* User's location marker */}
                    <Marker coordinate={{ latitude: userLocation.latitude, longitude: userLocation.longitude }}>
                        <MaterialIcons name="home" size={24} color="black" style={styles.HomeICO} />
                    </Marker>
                    {/* Optional Polyline for route */}
                    <Polyline
                        coordinates={[
                            { latitude: 10.4045, longitude: 76.3425 },
                            { latitude: userLocation.latitude, longitude: userLocation.longitude },
                        ]}
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
    orderBox: { flex: 1, flexDirection: 'row', justifyContent: 'space-between' },
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
    }
});
