
import AsyncStorage from '@react-native-community/async-storage';
import React, { useEffect } from 'react';
import { Image, Platform, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { Assets } from '../../assets';
import colors from '../../utils/colors';
import { saveUserDataToStore } from '../Login/actions';
import stripe from "tipsi-stripe";
import { getMasterDetails } from '../PostTicket/actions';

const Splash = (props) => {

    const { masterData } = useSelector((state) => ({
        masterData: state.TicketReducer.masterData,
    }));

    const dispatch = useDispatch();
    useEffect(async () => {
        // stripe.setOptions({
        //     publishableKey: 'pk_test_51Jl609HlinOnEri01vJjXXzcaQWfdHM3f9V4TvjQI2CBHahJOFh8EMSZ7rPdtwrW58PUdDSRBig15PgBJxVtFJOB004VohDiil',
        //     merchantId: 'sk_test_51Jl609HlinOnEri05Mh0fIKEPF2iIh4NeEBUGkGeFynPszpLZjBtVqtDrfyX1PqS7yIdCJacFwXEG6cQ4GYRb2Gc00uNz60tNY',
        //     androidPayMode: 'test'
        // })
        dispatch(getMasterDetails())
    },[])

    useEffect(async() => {
        console.log(" masterData ", masterData);
        if (masterData != null) {
            console.log(" masterData 111", masterData);
            // alert(success)
            stripe.setOptions({
                // publishableKey: 'pk_test_51Jl609HlinOnEri01vJjXXzcaQWfdHM3f9V4TvjQI2CBHahJOFh8EMSZ7rPdtwrW58PUdDSRBig15PgBJxVtFJOB004VohDiil',
                // merchantId: 'sk_test_51Jl609HlinOnEri05Mh0fIKEPF2iIh4NeEBUGkGeFynPszpLZjBtVqtDrfyX1PqS7yIdCJacFwXEG6cQ4GYRb2Gc00uNz60tNY',
                publishableKey: masterData.STRIPE_KEY,
                merchantId: masterData.STRIPE_SECRET,
            })
            console.log(" PROPS 11", props);
            let userData = await AsyncStorage.getItem('token');
            userData = JSON.parse(userData);
            console.log(" userData ", userData);
            dispatch(saveUserDataToStore(userData))
            setTimeout(() => {
                if (userData != null) {
                    if (!userData.user_subscription_valid) {
                        // if (Platform.OS == 'ios' && !userData.isSubscriptionOn) {
                        //     props.navigation.reset({
                        //         routes: [{ name: 'Home' }]
                        //     })
                        // } else {
                            props.navigation.reset({
                                routes: [{ name: 'Subscription' }]
                            })
                        // }
                    } else {
                        if (userData.email != null && userData.mobile != null && userData.fullName != null) {
                            props.navigation.reset({
                                routes: [{ name: 'Home' }]
                            })
                        } else {
                            props.navigation.reset({
                                routes: [{ name: 'Profile', params: { isFromPayment: true } }]
                            })
                        }
                        // props.navigation.reset({
                        //     routes: [{ name: 'Home' }]
                        // })
                    }
                } else {
                    props.navigation.reset({
                        routes: [{ name: 'Login' }]
                    })
                }
            }, 3000);
            // setMasterData(masterData)
        }
    }, [masterData]);

    return (
        <View style={{ flex: 1, backgroundColor: colors.blue, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={Assets.HOME_ICON} />
        </View>
    )
}

export default Splash
