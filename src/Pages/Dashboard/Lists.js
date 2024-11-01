import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { Card, Badge } from 'react-native-paper';
import { fetchRestaurants, selectResaurant, showHide } from '../../Store/actions/restaurantAction';
import { MaterialIcons, Feather } from '@expo/vector-icons';

const RestaurantList = ({ data }) => {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        dispatch(fetchRestaurants());
    }, []);


    const toggleMenu = (restaurant) => {
        setShowMenu(!showMenu);
        dispatch(showHide(restaurant));

    };
    const handleAddFav = () => { }
    const handleHide = () => { }

    const handleSelected = (restaurant) => {
        dispatch(selectResaurant(restaurant));
    }
    return (
        <View style={styles.container}>
            {data.map((item) => (
                <Card style={styles.card} key={item.id} onPress={() => handleSelected(item)}>
                    <View style={styles.cardContent}>
                        {/* Restaurant Image */}
                        <Image source={{ uri: item?.image }} style={styles.image} />
                        {/* Right-side Content */}
                        <View style={styles.info}>
                            <View style={styles.header}>
                                <Text style={styles.name} >{item.name}</Text>
                                <TouchableOpacity style={styles.menuMain} onPress={() => toggleMenu(item)}>
                                    <Feather name="more-vertical" size={24} color="gray" />
                                    {item?.display &&
                                        <View style={styles.menu}>
                                            <TouchableOpacity style={styles.menuItem}>
                                                <Text style={styles.menuText} onPress={() => { handleAddFav() }}><Feather name="heart" size={24} color="gray" /> Add to favourites</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={styles.menuItem}>
                                                <Text style={styles.menuText} onPress={() => { handleHide() }}><Feather name="eye-off" size={24} color="gray" /> Hide this restaurant</Text>
                                            </TouchableOpacity>
                                        </View>}
                                </TouchableOpacity>
                            </View>

                            <View style={styles.ratingRow} >
                                <MaterialIcons name="star" size={16} color="green" />
                                <Text style={styles.ratingText}>{item.rating} | {item.deliveryTime}</Text>
                            </View>

                            <Text style={styles.cuisine}>{item.cuisine}</Text>
                            <Text style={styles.location}>{item.location} • {item.distance} KM</Text>
                        </View>
                    </View>
                </Card>
            ))}
            <Text style={styles.finalText}>That's all folks!</Text>
        </View>
    );
};

export default RestaurantList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingHorizontal: 10,
        paddingVertical: 8,
    },
    card: {
        marginBottom: 15,
        borderRadius: 10,
        overflow: 'hidden',
    },
    cardContent: {
        flexDirection: 'row',
        padding: 10,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    info: {
        flex: 1,
        marginLeft: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    ratingText: {
        marginLeft: 5,
        color: 'gray',
    },
    cuisine: {
        marginTop: 5,
        color: 'gray',
    },
    location: {
        marginTop: 5,
        color: 'gray',
    },
    offer: {
        backgroundColor: 'black',
        padding: 5,
        borderRadius: 5,
        marginTop: 10,
    },
    offerText: {
        color: 'white',
        fontSize: 12,
    },
    vegBadge: {
        backgroundColor: '#00c853',
        color: 'white',
        marginTop: 10,
    },
    finalText: {
        fontSize: 72,
        fontWeight: 'bold',
    },
    menuMain: {
        position: 'relative',
    },
    menu: {
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: 'black',
        width: 200,
        padding: 0,
        paddingLeft: 10,
        borderLeftWidth: 1,
        borderLeftColor: 'gray',
        zIndex: 2,
    },
    menuItem: {
        paddingVertical: 10,
    },
    menuText: {
        fontSize: 14,
        color: 'white',
    },
});
