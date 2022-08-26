
import React, { useEffect, useState } from 'react';
import { Alert, Image, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import NumberFormat from 'react-number-format';
import { useSelector, useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import { Assets } from '../../assets';
import Loader from '../../component/Loader';
import SocialMediaButton from '../../component/SocialMediaButton';
import TextInputField from '../../component/TextInputField';
import { getData } from '../../utils/AsyncStorageHelper';
import colors from '../../utils/colors';
import { isEmpty, isValidEmail } from '../../utils/constant';
import { fonts } from '../../utils/fonts';
import styles from './styles';
var DeviceInfo = require('react-native-device-info');
import stripe from "tipsi-stripe";
import BaseContainer from '../../component/BaseContainer';
import { paymentDo, resetError } from './actions';
import { resetPaymentData } from '../Subscription/actions';
import AsyncStorage from '@react-native-community/async-storage';

const Payment = (props) => {

    const [user, setUser] = useState(null)
    const [email, setEmail] = useState('')
    const [cardNumber, setCardNumber] = useState('')
    const [cardName, setCardName] = useState('')
    const [cardExpiry, setCardExpiry] = useState('')
    const [cardCVV, setCardCVV] = useState('')
    const [isKeyboardShow, setIsKeyboardShow] = useState(false)
    const [showCVV, setShowCVV] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch();

    useEffect(async () => {
        console.log(" PROPS ", props);
        let userData = await AsyncStorage.getItem('token');
        console.log(" USER DATA 111", userData);
        userData = JSON.parse(userData);
        console.log(" USER DATA ", userData);
        setUser(userData)
    }, [])


    const { error, loading, paymentData } = useSelector((state) => ({
        error: state.Payment.error,
        loading: state.Payment.loading,
        paymentData: state.Payment.paymentData,
    }));

    useEffect(async () => {
        console.log(" USER ", paymentData);
        if (paymentData != null) {
            setIsLoading(false)
            console.log(" USER 111", paymentData);
            let userDataToSave = user;
            userDataToSave['user_subscription'] = true
            userDataToSave['user_subscription_valid'] = true
            await AsyncStorage.setItem('token', JSON.stringify(userDataToSave));

            if (user.email != null && user.mobile != null && user.fullName != null) {
                Alert.alert('Success', "Payment has been successfully received", [
                    {
                        text: 'OK',
                        onPress: () => {
                            dispatch(resetPaymentData())
                            props.navigation.reset({
                                routes: [{ name: 'Home' }]
                            })
                        },
                    },
                ]);
            } else {
                dispatch(resetPaymentData())
                props.navigation.reset({
                    routes: [{ name: 'Profile', params: { isFromPayment: true } }]
                })
            }
        }
        if (error != null) {
            setIsLoading(false)
            Alert.alert('Alert', error, [
                {
                    text: 'OK',
                    onPress: () => {
                        dispatch(resetError());
                    },
                },
            ]);
        }
    }, [error, paymentData]);

    const onNameChange = (text) => {
        setCardName(text)
    }

    const onCardNumberChange = (text) => {
        setCardNumber(text.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim())
    }

    const onCardExpiryChange = (text) => {
        console.log(" text ", text);
        if (text.length == 2 && cardExpiry.length == 1) {
            text += '/'
        } else if (text.length == 2 && cardExpiry.length == 3) {
            text = text.substring(0, text.length - 1)
        }

        setCardExpiry(text)

    }

    const onCardCVVChange = (text) => {
        setCardCVV(text)
    }

    const onRightIconClick = () => {
        setShowCVV(!showCVV)
    }

    const checkValidation = () => {
        if (isEmpty(email)) {
            alert("Please enter email address.")
            return false
        } else if (isEmpty(password)) {
            alert("Please enter password.")
            return false
        }
        return true
    }


    const onKeyboardShow = () => {
        console.log(" KEYBOARD SHOW ");
        setIsKeyboardShow(true)
    }

    const onKeyboardHide = () => {
        console.log(" KEYBOARD HIDE ");
        setIsKeyboardShow(false)
    }

    const onProfile = () => {
        props.navigation.navigate('AccountSetting')

    }

    const onNotification = () => {
        props.navigation.navigate('RatingDetail')
    }

    const onMenu = () => {
        props.navigation.openDrawer();
        // props.navigation.dispatch(DrawerActions.openDrawer());
    }

    const generateToken = async () => {
        let params = {
            number: cardNumber,
            expMonth: parseFloat(String(cardExpiry.substr(0, cardExpiry.indexOf("/")))),
            expYear: parseFloat(String(cardExpiry.substring(cardExpiry.indexOf("/") + 1))),
            cvc: cardCVV
        };

        console.log(" PARAMS ", params);
        var token = ''
        try {
            token = await stripe.createTokenWithCard(params);
        } catch (e) {
            setIsLoading(false)
            console.log(" CHECK TOKEN ", e.message);
            Alert.alert('Alert', e.message, [
                {
                    text: 'OK',
                    onPress: () => {
                        // dispatch(resetError());
                    },
                },
            ]);
            return null
        }
        console.log(" CHECK TOKEN ", token);

        return token != '' ? token : null
    }

    const onPayment = async () => {
        setIsLoading(true)
        let tokenData = await generateToken()

        let formData = new FormData();
        formData.append('payment_token', tokenData.tokenId)
        formData.append('encrypted_token', props.route.params.paymentData.encrypted_token)
        formData.append('auto_renewal', 1)

        dispatch(paymentDo(formData))
    }

    return (

        <BaseContainer
            {...props}
            isHideIcon={true}
            left={Assets.MENU}
            onLeft={onMenu}
            right={[Assets.PROFILE, Assets.NOTIFICATION]}
            onRight={[onProfile, onNotification]}
            title={"Payment Method"}
        >
            {/* <View style={{ flex: 1, marginHorizontal: 16 }}> */}
            {loading || isLoading ? <Loader /> : null}
            <KeyboardAwareScrollView style={{ flex: 1, backgroundColor: colors.SCREEN_BACKGROUND, }} contentContainerStyle={{ flex: 1, }} showsVerticalScrollIndicator={false}
                onKeyboardDidShow={onKeyboardShow}
                onKeyboardDidHide={onKeyboardHide}
            >

                <View style={{ flex: 1, paddingHorizontal: 16 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: colors.white, padding: 14, marginVertical: 30, borderRadius: 10 }}>
                        <Text style={{ fontFamily: fonts.MEDIUM_500, fontSize: 16 }}>{'Stripe'}</Text>

                        <Image source={Assets.RADIO_SELECTED} />
                    </View>

                    <Text style={{ fontFamily: fonts.MEDIUM_500, fontSize: 20 }}>{'Card Information'}</Text>
                    <View style={{ padding: 10, paddingBottom: 30, backgroundColor: colors.white, borderRadius: 8, }}>
                        <TextInputField
                            title={"Card Holder Name*"}
                            placeholder={'Bruce Lee'}
                            onChangeText={onNameChange}
                            inputValue={cardName}
                        />

                        <TextInputField
                            title={"Card Number*"}
                            placeholder={'1234-5678-9012-3456'}
                            onChangeText={onCardNumberChange}
                            inputValue={cardNumber}
                            maxLength={19}
                            keyboardType={"number-pad"}
                        />

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TextInputField
                                style={{ flex: 1, marginRight: 5 }}
                                title={"Expiry Date*"}
                                placeholder={'05/23'}
                                onChangeText={onCardExpiryChange}
                                inputValue={cardExpiry}
                                maxLength={5}
                                keyboardType={"number-pad"}
                            />
                            <TextInputField
                                style={{ flex: 1, marginLeft: 5 }}
                                title={"CSV*"}
                                placeholder={''}
                                onChangeText={onCardCVVChange}
                                inputValue={cardCVV}
                                maxLength={19}
                                keyboardType={"number-pad"}
                                secureTextEntry={!showCVV}
                                rightIcon={Assets.EYE}
                                onRightIcon={onRightIconClick}
                            />
                        </View>
                    </View>
                </View>
            </KeyboardAwareScrollView>
            {!isKeyboardShow ? <View style={{ backgroundColor: colors.SCREEN_BACKGROUND }}>
                <View style={{ backgroundColor: colors.white, overflow: 'hidden', flexDirection: 'row', padding: 20, justifyContent: 'space-between', alignItems: 'center', borderTopLeftRadius: 30, borderTopRightRadius: 30, borderWidth: 0 }}>
                    <Text style={{ fontFamily: fonts.BOLD_700, fontSize: 22 }}>{'USD ' + props.route.params.paymentData.payment_amount}</Text>

                    <TouchableOpacity style={{ backgroundColor: colors.blue, paddingHorizontal: 30, paddingVertical: 15, borderRadius: 40 }} onPress={onPayment}>
                        <Text style={{ fontFamily: fonts.MEDIUM_500, fontSize: 13, color: colors.white }}>{'Pay Now'}</Text>
                    </TouchableOpacity>
                </View>
            </View> : null}
        </BaseContainer>
    )
}


export default Payment
