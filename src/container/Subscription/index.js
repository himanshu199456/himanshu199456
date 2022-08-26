
import AsyncStorage from '@react-native-community/async-storage';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, FlatList, Image, ImageBackground, Platform, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
// import { useIAP } from 'react-native-iap';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { Assets } from '../../assets';
import BaseContainer from '../../component/BaseContainer';
import HomeOption from '../../component/HomeOption';
import Loader from '../../component/Loader';
import MTButton from '../../component/MTButton';
import colors from '../../utils/colors';
import { DEVICE } from '../../utils/constant';
import { fonts } from '../../utils/fonts';
import { logoutAction } from '../Login/actions';
import { applyCouponAPI, applyCouponData, getSubscriptionList, proccessPaymentData, resetError } from './actions';
import * as RNIap from 'react-native-iap';

const Subscription = (props) => {

    const [user, setUser] = useState(null)
    const [currentIndex, setCurrentIndex] = useState(0);
    const [applyCoupon, setApplyCoupon] = useState('');
    const [isCouponApplied, setIsCouponApplied] = useState(false);
    const [applyCouponMessage, setApplyCouponMessage] = useState('');

    const [planData, setPlanData] = useState(null);
    const detailRef = useRef(null)
    const headerRef = useRef(null)
    const { data, error, loading, paymentData, applyCouponData } = useSelector((state) => ({
        data: state.Subscription.subscriptionList,
        error: state.Subscription.error,
        loading: state.Subscription.loading,
        paymentData: state.Subscription.paymentTokenData,
        applyCouponData: state.Subscription.applyCouponData,
    }));

    // const {
    //     connected,
    //     products,
    //     promotedProductsIOS,
    //     subscriptions,
    //     purchaseHistories,
    //     availablePurchases,
    //     currentPurchase,
    //     currentPurchaseError,
    //     finishTransaction,
    //     getProducts,
    //     getSubscriptions,
    //     getAvailablePurchases,
    //     getPurchaseHistories,
    //     requestPurchase,
    //     requestSubscription
    // } = useIAP();

    const productIds = Platform.select({
        ios: [
            'com.individual.month',
            'com.individual.year'
        ]
    });

    const dispatch = useDispatch();
    useEffect(async () => {
        // if(Platform.OS == 'ios'){
        //     await RNIap.initConnection(); 
        //     try {
        //         const products = await RNIap.getProducts(productIds);
        //         console.log('PRODUCTS', products);
        //     } catch (err) {
        //         console.log("product error", err); // standardized err.code and err.message available
        //     }
        // }

        console.log(" PROPS 22", props);
        let userData = await AsyncStorage.getItem('token');
        console.log(" USER DATA 111", userData);
        userData = JSON.parse(userData);
        console.log(" USER DATA ", userData);
        setUser(userData)
        dispatch(getSubscriptionList())
    }, [])

    useEffect(async () => {
        console.log(" USER ", paymentData);
        if (paymentData != null) {
            console.log(" USER 111", paymentData);
            resetError()
            props.navigation.navigate('Payment', { paymentData })
        }
        if (applyCoupon != null) {
            setIsCouponApplied(true)
        }
        if (error != null) {
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

    const onCouponChange = (text) => {
        setApplyCoupon(text)
    }

    const renderItem = ({ item, index }) => {
        return (
            <View style={{ width: DEVICE.DEVICE_WIDTH - 20, height: 200, borderRadius: 10, marginHorizontal: 10, marginVertical: 20, }}>
                <Image source={{ uri: item.plan_image }} style={{ position: 'absolute', width: '100%', height: '100%', borderRadius: 10, }} />
                <View style={{ backgroundColor: colors.transparent, width: DEVICE.DEVICE_WIDTH - 20, height: '100%', borderRadius: 24, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 60 }}>
                    <Text style={{ textAlign: 'center', fontFamily: fonts.REGULAR, fontWeight: '700', fontSize: 20, color: colors.white }}>{item["name "]}</Text>
                    <TouchableOpacity style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 10, backgroundColor: colors.blue, borderRadius: 20 }}>
                        <Text style={{ fontFamily: fonts.REGULAR, fontSize: 12, fontWeight: '500', color: colors.white, marginHorizontal: 20 }}>{'Upgrade Now!'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    const renderItemDot = ({ item, index }) => {
        return (
            currentIndex == index ? <View style={{ margin: 5, borderRadius: 14, backgroundColor: '#3B5998', height: 9, width: 9 }} />
                : <View style={{ margin: 5, borderRadius: 14, borderWidth: 1, borderColor: '#3B5998', height: 9, width: 9 }} />
        )
    }

    const onPlanClick = (item, index) => {
        setPlanData(item)
    }

    const onApplyClick = () => {
        if (planData == null) {
            alert("Please select subscription plan")
            return
        } else if (applyCoupon == '') {
            alert('Please enter coupon code')
            return
        }
        let formData = new FormData()
        formData.append('coupon_code', applyCoupon)

        dispatch(applyCouponAPI(formData))
    }

    const renderItemDetail = ({ item, index }) => {
        return (
            <View style={{ width: DEVICE.DEVICE_WIDTH }}>
                {
                    item.instruction.map((data, index) => {
                        return (
                            <View key={index} style={{ marginHorizontal: 30, flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                                <Image source={{ uri: data.icon_image }} style={{ width: 30, height: 30 }} />
                                <View style={{ marginLeft: 20 }}>
                                    <Text style={{ fontFamily: fonts.REGULAR, fontWeight: '500', color: colors.header_color }}>{data.heading}</Text>
                                    <Text style={{ fontFamily: fonts.REGULAR, fontWeight: '500', fontSize: 11, color: colors.text_light, opacity: 0.7 }}>{data.sub_heading}</Text>
                                </View>
                            </View>
                        )
                    })
                }
                <View style={{ backgroundColor: colors.gray, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 60, paddingVertical: 10, marginTop: 10 }}>
                    <Text style={{ textAlign: 'center', fontFamily: fonts.REGULAR, fontWeight: '500', color: colors.text_light, opacity: 0.7 }}>{item.plan_term_conditions}</Text>
                </View>

                <View style={{ borderWidth: 1, borderColor: colors.border, flexDirection: 'row', padding: 12, marginHorizontal: 30, marginTop: 10, borderRadius: 4, alignItems: 'center' }}>
                    <Image source={Assets.DISCOUNT} />
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} pointerEvents={applyCouponData != null ? 'none' : 'auto'}>
                        {/* <Text style={{ fontFamily: fonts.REGULAR, fontWeight: '500', color: colors.header_color, marginLeft: 18 }}>{"APPLY  COUPON"}</Text> */}

                        <TextInput
                            style={{ flex: 1, fontFamily: fonts.REGULAR, fontWeight: '500', color: colors.header_color, marginLeft: 18 }}
                            placeholder={"APPLY  COUPON"}
                            value={applyCoupon}
                            onChangeText={onCouponChange}
                        />

                        <TouchableOpacity onPress={onApplyClick}>
                            <Text style={{ fontFamily: fonts.MEDIUM_500, fontSize: 10 }}>{"APPLY"}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {
                    isCouponApplied && applyCouponData != null ?
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                            <Text style={{ fontFamily: fonts.BOLD_700, fontSize: 12 }}>{`${applyCouponData.discount_value} discount applied`}</Text>
                        </View>
                        : null
                }

                <View style={{ marginHorizontal: 20, marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

                    {
                        item.plan_prices.map((data, index) => {
                            return (
                                <TouchableOpacity key={index} style={{
                                    marginLeft: 10, flex: 1, height: 125, justifyContent: 'center', alignItems: 'center', borderRadius: 15, borderWidth: 1, borderColor: planData != null && planData.id == data.id ? colors.blue : colors.border,
                                    paddingHorizontal: 20, paddingVertical: 20, borderWidth: planData != null && planData.id == data.id ? 2 : 1
                                }}
                                    onPress={() => onPlanClick(data, index)}>
                                    <Text style={{ fontFamily: fonts.REGULAR, fontWeight: '500', color: colors.header_color }}>{data.duration_text}</Text>

                                    <Text style={{ fontFamily: fonts.REGULAR, fontWeight: '500', fontSize: 21, color: colors.header_color }}>{"$" + (data.sale_amount != null ? data.sale_amount : data.price)}
                                        <Text style={{ fontFamily: fonts.REGULAR, fontSize: 11, fontWeight: '500', color: colors.text_light, opacity: 0.7, }}>{"/" + data.duration_text}</Text>
                                    </Text>


                                    {data.sale_amount != null ? <Text style={{ fontFamily: fonts.REGULAR, fontSize: 17, fontWeight: '700', color: colors.light_gray_text, }}>{"$" + data.price}
                                        <Text style={{ fontFamily: fonts.REGULAR, fontSize: 11, fontWeight: '700', color: colors.light_gray_text, }}>{"/" + data.duration_text}</Text>
                                    </Text> : null}
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>

                <MTButton title={'Proceed'} onClick={() => onClick(item, index)} />
            </View>
        )
    }

    const onScrollEnd = (e) => {
        let contentOffset = e.nativeEvent.contentOffset;
        let viewSize = e.nativeEvent.layoutMeasurement;

        // Divide the horizontal offset by the width of the view to see which page is visible
        let pageNum = Math.floor(contentOffset.x / viewSize.width);
        // console.log(" CHECK PAGE NUMBER ", pageNum);
        if (!isNaN(pageNum)) {
            detailRef.current.scrollToIndex({ animated: true, index: pageNum })
            headerRef.current.scrollToIndex({ animated: true, index: pageNum })
            setCurrentIndex(pageNum)
        }
    }

    const requestSubscription = async (sku) => {
        if (Platform.OS === 'ios') {
            await RNIap.clearTransactionIOS();
        }
        try {
            var purchase = await RNIap.requestSubscription(sku);
            console.log(' purchase ', purchase);
        } catch (err) {
            console.log(err.code, err.message);
        }
    }

    const onClick = (item, index) => {
        // requestSubscription('com.individual.month')
        // return
        console.log(" CHECK ITEM ", planData);
        if (planData == null) {
            alert("Please select subscription plan")
            return
        }
        let formData = new FormData();
        formData.append('plan_price_id', planData.id)
        formData.append('coupon_code', applyCoupon)

        let data = {
            plan_price_id: planData.id,
            coupon_code: applyCoupon
        }

        console.log(" CHECK FORM DATA ", data);
        dispatch(proccessPaymentData(formData))
    }

    return (
        <BaseContainer
            {...props}
            isHideIcon={true}
            title={"Subscription "}>
            {loading ? <Loader /> : null}
            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
                <View style={{ flex: 1 }}>
                    <FlatList
                        ref={headerRef}
                        data={data}
                        horizontal={true}
                        renderItem={renderItem}
                        pagingEnabled={true}
                        showsHorizontalScrollIndicator={false}
                        onMomentumScrollEnd={onScrollEnd}
                    />
                    <FlatList
                        style={{ alignSelf: 'center' }}
                        data={data}
                        horizontal={true}
                        renderItem={renderItemDot}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
                <FlatList
                    ref={detailRef}
                    style={{ alignSelf: 'center' }}
                    data={data}
                    horizontal={true}
                    renderItem={renderItemDetail}
                    pagingEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    onMomentumScrollEnd={onScrollEnd}
                />
            </ScrollView>
        </BaseContainer>
    )
}

export default Subscription
