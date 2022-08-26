
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Image, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ToggleSwitch from 'toggle-switch-react-native';
import { Assets } from '../../assets';
import BaseContainer from '../../component/BaseContainer';
import Loader from '../../component/Loader';
import colors from '../../utils/colors';
import { fonts } from '../../utils/fonts';
import { cancelAutoRenew, getPaymentList, resetError } from './actions';

const TransactionHistory = (props) => {

    const [notificationPhoto, setNotificationPhoto] = useState(null)
    const [user, setUser] = useState(null)
    const [isNext, setIsNext] = useState(false)
    const [isToggle, setIsToggle] = useState(false)
    const [isToggleDisable, setIsToggleDisable] = useState(false)
    const dispatch = useDispatch();
    useEffect(async () => {
        console.log(" PROPS ", props);
        console.log(" PROPS 22", props);
        let userData = await AsyncStorage.getItem('token');
        console.log(" USER DATA 111", userData);
        userData = JSON.parse(userData);
        console.log(" USER DATA ", userData);
        setUser(userData)
        setIsToggle(userData.subscription_canceled == '0' ? true : false)
        setIsToggleDisable(userData.subscription_canceled == '0' ? false : true)
        dispatch(getPaymentList())
    }, [])


    const { error, loading, paymentList, isCancelSuccess } = useSelector((state) => ({
        error: state.PaymentHistory.error,
        loading: state.PaymentHistory.loading,
        paymentList: state.PaymentHistory.paymentList,
        isCancelSuccess: state.PaymentHistory.isCancelSuccess,
    }));

    useEffect(() => {
        // 
        if (isCancelSuccess != null) {
            setIsToggle(false)
            dispatch(resetError());
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
    }, [error, isCancelSuccess]);


    const categories = [
        "1", "1", "1", "1", "1",
    ]

    const onProfile = () => {

    }

    const onNotification = () => {

    }

    const onMenu = () => {
        props.navigation.openDrawer();
    }

    const renderItem = ({ item, index }) => {
        return (
            <View style={{ flexDirection: 'row', borderColor: colors.border_color, borderWidth: 1, backgroundColor: colors.white, padding: 10 }}>

                <Text style={{ fontFamily: fonts.MEDIUM_500, color: colors.black, fontSize: 13 }}>{index + 1}</Text>
                <Text style={{ flex: 4, fontFamily: fonts.REGULAR_400, color: colors.text_light, fontSize: 13, width: "80%", marginLeft: 10 }}>{moment(item.payment_date).format('DD MMMM YYYY')}</Text>
                <Text style={{ flex: 1, fontFamily: fonts.REGULAR_400, color: colors.text_light, fontSize: 13 }}>{"$ " + item.paid_amout}</Text>
            </View>
        )
    }

    const onNewRequest = () => {
        props.navigation.navigate('NewRequest')
    }

    const onToggleChange = (isOn) => {
        if (user.subscription_canceled == '0') {
            let formData = new FormData()
            formData.append('subscription_id',paymentList.subscription_id)
            dispatch(cancelAutoRenew(formData))
        }
    }

    return (
        <BaseContainer
            {...props}
            left={Assets.MENU}
            onLeft={onMenu}
            right={[Assets.PROFILE, Assets.NOTIFICATION]}
            onRight={[onProfile, onNotification]}
            title={"Transaction History"}>
            {/* {console.log(" DATA ", data)} */}
            {loading ? <Loader /> : null}
            {paymentList != null ?
                <View style={{ flex: 1, backgroundColor: colors.SCREEN_BACKGROUND, padding: 15, }}>
                    <View style={{ borderRadius: 20 }}>
                        <View style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10, overflow: 'hidden' }}>
                            <Text style={{ padding: 10, fontFamily: fonts.MEDIUM_500, backgroundColor: colors.blue, color: colors.white, }}> {"My Current Plan"}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white, }}>
                            <View style={{ flex: 1, padding: 20, backgroundColor: colors.white }}>
                                <Text style={{ fontFamily: fonts.REGULAR_400, color: colors.black, marginTop: 5, fontSize: 25 }}>{"$ " + paymentList.subscription_paid_amout}<Text style={{ fontFamily: fonts.REGULAR_400, color: colors.text_light, marginTop: 5, fontSize: 17 }}> {"/" + paymentList.subscription_plan_duration}</Text></Text>
                                <Text style={{ fontFamily: fonts.REGULAR_400, color: colors.text_light, marginTop: 5, fontSize: 9 }}> {paymentList.current_plan_name}</Text>
                            </View>
                            <View style={{ backgroundColor: colors.white, justifyContent: 'center' }}>
                                <ToggleSwitch
                                    isOn={isToggle}
                                    onColor="green"
                                    offColor="gray"
                                    label="Auto renew"
                                    style={{ backgroundColor: colors.white, alignItems: 'center' }}
                                    labelStyle={{ color: "black", fontWeight: "400", fontFamily: fonts.REGULAR_400 }}
                                    size="large"
                                    disabled={isToggleDisable}
                                    onToggle={onToggleChange}
                                />
                            </View>
                        </View>
                    </View>
                    {paymentList.subscription_payment != undefined && paymentList.subscription_payment.length > 0 ?
                        <FlatList
                            style={{ marginTop: 20 }}
                            data={paymentList.subscription_payment}
                            renderItem={renderItem}
                            showsVerticalScrollIndicator={false}
                        /> :
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontFamily: fonts.MEDIUM_500, fontSize: 16 }}>{"No Data Found!"}</Text>
                        </View>
                    }
                </View> : null}
        </BaseContainer>
    )
}

export default TransactionHistory
