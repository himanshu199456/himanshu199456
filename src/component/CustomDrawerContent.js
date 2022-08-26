import React, { FC, useEffect, useState } from 'react';
import { FlatList, Image, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Assets } from '../assets';
import colors from '../utils/colors';
import { fonts } from '../utils/fonts';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { isIphoneXorAbove } from '../utils/constant';
import { DrawerActions } from '@react-navigation/routers';
import AsyncStorage from '@react-native-community/async-storage';
import { logoutAction } from '../container/Login/actions';
import { useDispatch } from 'react-redux';



const CustomDrawerContent = (props) => {
    console.log(" CHECK PROPS ", props.navigation);

    let optionArray = [
        { title: "Home", icon: Assets.HOME_SIDEBAR, routeName: 'Home' },
        { title: "Panic Recording", icon: Assets.RECORD_SIDEBAR, routeName: 'RecordingScreen' },
        { title: "Post a new ticket", icon: Assets.TICKET_SIDEBAR, routeName: 'PostTicket' },
        { title: "View tickets in progress", icon: Assets.TICKET_INPROGRESS_SIDEBAR, routeName: 'ViewTickets' },
        // { title: "Subscription", icon: Assets.SUBSCRIPTION_SIDEBAR, routeName: 'Subscription' },
        { title: "Support Request", icon: Assets.SUPPORT_SIDEBAR, routeName: 'SupportRequest' },
        { title: "Chat", icon: Assets.CHAT_SIDEBAR, routeName: 'Chat' },
        // { title: "Payment History", icon: Assets.PAYMENT_SIDEBAR, routeName: 'TransactionHistory' },
        { title: "Refer a Friend", icon: Assets.REFER_SIDEBAR, routeName: 'ReferFriend' },
        { title: "My Profile", icon: Assets.PROFILE_SIDEBAR, routeName: 'Profile' },
        { title: "Account Settings", icon: Assets.SETTINGS_SIDEBAR, routeName: 'AccountSetting' },
        { title: "Logout", icon: Assets.LOGOUT_SIDEBAR, routeName: 'logout' },
    ]
    const [user, setUser] = useState(null)
    const [drawerOption, setDrawerOption] = useState(optionArray)
    useEffect(async () => {
        console.log(" PROPS 22", props);
        let userData = await AsyncStorage.getItem('token');
        console.log(" USER DATA 111", userData);
        userData = JSON.parse(userData);
        console.log(" USER DATA ", userData);
        setUser(userData)
        if (userData.user_id != '89') {
            optionArray.splice(6,0,{ title: "Payment History", icon: Assets.PAYMENT_SIDEBAR, routeName: 'TransactionHistory' })
        }
        setDrawerOption([...optionArray])
        console.log(' OPTION ARRAY ',optionArray);
    }, [])
    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20, paddingHorizontal: 20 }} onPress={() => props.navigation.navigate('Home')}>
                <Image style={{ tintColor: colors.blue }} source={item.icon} />
                <Text style={{ fontFamily: fonts.MEDIUM_500, marginLeft: 15 }}>{item.title}</Text>
            </TouchableOpacity>
        )
    }

    const dispatch = useDispatch();
    const onLogout = async (props) => {
        dispatch(logoutAction())
        await AsyncStorage.removeItem('token')
        props.navigation.reset({
            routes: [{ name: 'Login' }]
        })
    }

    const onItemClick = (item, index, props) => {
        if (item.routeName == 'logout') {
            onLogout(props)
        } else {
            // props.navigation.reset({
            //     routes: [{ name: item.routeName || "Home" }]
            // })
            if (item.routeName == 'PostTicket') {
                // isEdit: true
                props.navigation.navigate(item.routeName, { isEdit: false })
            } else {
                props.navigation.navigate(item.routeName || "Home")
            }
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{ paddingTop: isIphoneXorAbove() ? 70 : 30, backgroundColor: colors.blue, paddingBottom: 20 }}>
                <TouchableOpacity onPress={() => props.navigation.dispatch(DrawerActions.closeDrawer())}>
                    <Image source={Assets.CLOSE} style={{ alignSelf: 'flex-end', marginRight: 10 }} />
                </TouchableOpacity>

                {user != null ? <View style={{ marginHorizontal: 24 }}>
                    <Image source={{ uri: user.profile_img }} style={{ height: 120, width: 120, borderRadius: 240 }} />
                    <Text style={{ marginTop: 10, fontSize: 23, fontFamily: fonts.REGULAR, fontWeight: '400', color: colors.white, }}>{user.fullName}</Text>
                    <Text style={{ marginTop: 0, fontSize: 9, fontFamily: fonts.REGULAR, fontWeight: '400', color: colors.white, width: 167 }}>{user.email}</Text>
                </View> : null}


            </View>
            {/* <View style={{ backgroundColor: colors.white }}> */}
            <FlatList
                contentContainerStyle={{ paddingBottom: 30 }}
                showsVerticalScrollIndicator={false}
                data={drawerOption}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20, paddingHorizontal: 20 }} onPress={() => onItemClick(item, index, props)}>
                            <Image style={{ tintColor: colors.blue }} source={item.icon} />
                            <Text style={{ fontFamily: Platform.OS == 'android' ? fonts.BOLD_700 : fonts.MEDIUM_500, marginLeft: 15 }}>{item.title}</Text>
                        </TouchableOpacity>
                    )
                }}
            />
            {/* </View> */}
        </View>

    );
};

const styles = StyleSheet.create({
    container: { marginTop: 20, marginHorizontal: 10, flexDirection: 'row', alignItems: 'center', padding: 22, backgroundColor: colors.red, borderRadius: 15 },
    text: { fontFamily: fonts.REGULAR, fontSize: 20, fontWeight: '500', color: colors.white, marginLeft: 20 }
})
export default CustomDrawerContent;
