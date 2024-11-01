import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Switch, TextInput, TouchableOpacity, ScrollViewComponent } from 'react-native';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { goToMenu, addToCart, moveToTrack } from '../../Store/actions/restaurantAction';
import SlideToPay from '../../Components/SlideToPay';
export default function Checkout() {
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.user)
    const selected = useSelector((state) => state.restaurant.selectedRestaurant)
    const cart = useSelector((state) => state.restaurant.cart)
    const [user, setUser] = useState({});
    const [delivery, setDelivery] = useState({});
    const instructions = [
        { id: 1, label: 'Avoid ringing bell', active: false, icon: 'doorbell' },
        { id: 2, label: 'Leave at door', active: false, icon: 'door-sliding' },
        { id: 3, label: 'Avoid calling', active: false, icon: 'phone' },
        { id: 4, label: 'Leave with Security', active: false, icon: 'person' }
    ]

    useEffect(() => {
        if (Array.isArray(userData?.user)) {
            let currentUser = userData.user[0];
            let currentAddress = currentUser?.address?.filter(item => item?.type === currentUser?.current);
            setUser(currentUser);
            setDelivery(currentAddress?.[0]);
        }
    }, [userData]);
    const handleAddToCart = (restaurant, item, actionType) => {
        dispatch(addToCart(restaurant, item, actionType));
    };

    const generateOrderId = () => {
        const randomDigits = Math.floor(10000 + Math.random() * 90000); // Generates a random number between 10000 and 99999
        return `ORD${randomDigits}`; // Concatenate "ORD" with the random digits
    };

    const handlePayment = (total) => {
        alert(`Payment of ₹ ${total} triggered!`);
        let orderID = generateOrderId();
        dispatch(moveToTrack(total, orderID))

    };

    const totalAmount = Array.isArray(cart) ? cart.reduce((total, item) => total + (item.price * item.quantity), 0) : 0;
    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.content}>
                    <Feather name="arrow-left" size={20} color="black" onPress={() => dispatch(goToMenu())} />
                </View>
                {/* Restaurant Details */}
                <View style={styles.section2} backgroundColor="white">
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
                {/* User Details */}
                <View style={styles.content2}>
                    <View style={styles.flexContent}>
                        <Feather name="navigation" size={20} color="orange" />
                        <Text style={styles.locationText}>{delivery?.name} |</Text>
                        <Text> {selected?.deliveryTime} </Text>
                    </View>
                    <Text style={styles.changeText}>Change</Text>
                </View>
                {/* Cart Details */}
                <View style={styles.content3}>
                    {cart && cart.map(menuItem => {
                        return <View style={styles.flexContent} key={menuItem.id}>
                            <View style={styles.flexContent}>
                                <MaterialIcons name={menuItem.veg ? "spa" : "pets"} size={20} color={menuItem.veg ? 'green' : "#FF6969"} />
                                <Text>{menuItem.name}</Text>
                            </View>
                            <View style={styles.quantityDisplay}>
                                <TouchableOpacity onPress={() => handleAddToCart(selected, menuItem, "DEC")} disabled={menuItem.quantity === 0}>
                                    <Text style={styles.controlButton}>-</Text>
                                </TouchableOpacity>
                                <Text style={styles.qtyText}>{menuItem.quantity}</Text>
                                <TouchableOpacity onPress={() => handleAddToCart(selected, menuItem, "INC")}>
                                    <Text style={styles.controlButton}>+</Text>
                                </TouchableOpacity>
                            </View>
                            <Text>₹ {menuItem.price}</Text>
                        </View>
                    })}
                    <View style={{ borderTopWidth: 1, borderColor: '#ddd', marginTop: 20, }}>
                        <TouchableOpacity>
                            <Text style={styles.changeText2} onPress={() => dispatch(goToMenu())}>Add more items</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {/* Delivery Details */}
                <Text style={styles.boldText}>Delivery Instructions</Text>
                <View style={styles.content4}>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 10 }}>
                        {instructions && instructions.map(item => {
                            return <TouchableOpacity key={item.id}>
                                <View style={styles.box}>
                                    <MaterialIcons name={item.icon} size={26} color="black" marginBottom={8} />
                                    <Text style={{ textAlign: 'center' }}>{item.label}</Text>
                                </View>
                            </TouchableOpacity>
                        })}
                    </ScrollView>
                </View>
                {/* Bill Details */}
                <Text style={styles.boldText}>Bill Details</Text>
                <View style={[styles.content3, { marginBottom: 100, }]}>
                    <View style={styles.billMain}>
                        <Text style={styles.changeText3}>Item Total</Text>
                        <Text style={styles.changeText4}>₹ {totalAmount}</Text>
                    </View>
                    <View style={styles.billMain}>
                        <Text style={styles.changeText3}>Delivery Charges</Text>
                        <Text style={styles.changeText4}>₹ {70}</Text>
                    </View>
                    <View style={styles.billMain}>
                        <Text style={styles.changeText3}>Platform fee</Text>
                        <Text style={styles.changeText4}>₹ {5}</Text>
                    </View>
                    <View style={[styles.billMain, { borderTopWidth: 1, marginTop: 8, borderColor: '#ddd', paddingTop: 8 }]}>
                        <Text style={[styles.changeText3]}>Amount to pay</Text>
                        <Text style={styles.changeText4}>₹ {totalAmount + 70 + 5}</Text>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.paymentCard}>
                <View style={styles.paymentCard1}>
                    <Text style={styles.cartText}>Pay via Cash</Text>
                    <TouchableOpacity>
                        <Text style={styles.changeText}>Change</Text>
                    </TouchableOpacity>
                </View>
                <SlideToPay finalAmount={totalAmount + 70 + 5} handlePayment={handlePayment} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '95%',
        alignSelf: 'center'
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
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
        margin: 0,
        marginTop: 10,
        padding: 20,
        alignItems: 'center',
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 8
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
        borderRadius: 8
    },
    flexContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginTop: 4
    },
    locationText: {
        marginLeft: 5,
        fontWeight: 'bold',
        fontSize: 18,
    },
    changeText: {
        color: 'grey'
    },
    changeText2: {
        color: 'grey',
        padding: 10,
        paddingLeft: 0,
        paddingRight: 0,
    },
    changeText3: {
        color: 'grey',
        fontSize: 14
    },
    changeText4: {
        fontSize: 14
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
    controlButton: {
        fontSize: 24,
        paddingHorizontal: 10,
        color: 'green',
    },
    boldText: {
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 20,
        paddingLeft: 8
    },
    content4: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 3
    },
    box: {
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        backgroundColor: "#fff",
        width: 100,
        padding: 12,
        height: 100,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginRight: 8
    },
    billMain: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    paymentCard: {
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 8,
        bottom: 16,
        backgroundColor: '#fff',

    },
    paymentCard1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    finalPay: {
        backgroundColor: 'green',
        borderRadius: 8,
        color: '#fff',
        padding: 12,
        marginTop: 10,
        textAlign: 'center',
        justifyContent: 'space-between',
    }
});
