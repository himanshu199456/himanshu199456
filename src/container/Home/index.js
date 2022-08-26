
import AsyncStorage from '@react-native-community/async-storage';
import { DrawerActions } from '@react-navigation/routers';
import React, { useEffect, useState } from 'react';
import { Alert, Image, SafeAreaView, ScrollView, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { Assets } from '../../assets';
import BaseContainer from '../../component/BaseContainer';
import HomeOption from '../../component/HomeOption';
import MTHeader from '../../component/MTHeader';
import colors from '../../utils/colors';
import { fonts } from '../../utils/fonts';
import { logoutAction } from '../Login/actions';
import { getSpeedoMeter } from './actions';
import RNSpeedometer from 'react-native-speedometer'

const Home = (props) => {

    const [user, setUser] = useState(null)
    const [spreedometerData, setSpreedometerData] = useState(null)

    const dispatch = useDispatch();
    useEffect(async () => {
        console.log(" PROPS 22", props);
        let userData = await AsyncStorage.getItem('token');
        console.log(" USER DATA 111", userData);
        userData = JSON.parse(userData);
        console.log(" USER DATA ", userData);
        setUser(userData)
        dispatch(getSpeedoMeter())
    }, [])

    const { error, loading, data } = useSelector((state) => ({
        error: state.Home.error,
        loading: state.Home.loading,
        data: state.Home.data,
    }));

    // const labels = [
    //     {
    //       name: 'Case Resolved ',
    //       labelColor: '#ff2900',
    //       activeBarColor: '#ff2900',
    //     },
    //     {
    //       name: 'Case Resolved ' ,
    //       labelColor: '#ff5400',
    //       activeBarColor: '#ff5400',
    //     },
    //     {
    //       name: 'Case Resolved ' ,
    //       labelColor: '#f4ab44',
    //       activeBarColor: '#f4ab44',
    //     },
    //     {
    //       name: 'Case Resolved ' ,
    //       labelColor: '#f2cf1f',
    //       activeBarColor: '#f2cf1f',
    //     },
    //     {
    //       name: 'Case Resolved ' ,
    //       labelColor: '#14eb6e',
    //       activeBarColor: '#14eb6e',
    //     },
    //     {
    //       name: 'Case Resolved ',
    //       labelColor: '#00ff6b',
    //       activeBarColor: '#00ff6b',
    //     },
    //   ]

    const labels = [
        {
            name: spreedometerData != null ? 'Case Resolved ' + spreedometerData?.totalCaseTicketsWin + "/" + spreedometerData?.totalCaseTicketsWinLost : 0,
            labelColor: colors.blue,
            activeBarColor: '#ff2900',
        },
        {
            name: spreedometerData != null ? 'Case Resolved ' + spreedometerData?.totalCaseTicketsWin + "/" + spreedometerData?.totalCaseTicketsWinLost : 0,
            labelColor: colors.blue,
            activeBarColor: '#ff5400',
        },
        {
            name: spreedometerData != null ? 'Case Resolved ' + spreedometerData?.totalCaseTicketsWin + "/" + spreedometerData?.totalCaseTicketsWinLost : 0,
            labelColor: colors.blue,
            activeBarColor: '#f4ab44',
        },
        {
            name: spreedometerData != null ? 'Case Resolved ' + spreedometerData?.totalCaseTicketsWin + "/" + spreedometerData?.totalCaseTicketsWinLost : 0,
            labelColor: colors.blue,
            activeBarColor: '#f2cf1f',
        },
        {
            name: spreedometerData != null ? 'Case Resolved ' + spreedometerData?.totalCaseTicketsWin + "/" + spreedometerData?.totalCaseTicketsWinLost : 0,
            labelColor: colors.blue,
            activeBarColor: '#14eb6e',
        },
        {
            name: spreedometerData != null ? 'Case Resolved ' + spreedometerData?.totalCaseTicketsWin + "/" + spreedometerData?.totalCaseTicketsWinLost : 0,
            labelColor: colors.blue,
            activeBarColor: '#00ff6b',
        },
    ]

    useEffect(() => {
        if (data != null) {
            console.log("data ====>", JSON.stringify(data));
            setSpreedometerData(data)
        }

        // if (error != null) {
        //     Alert.alert('Alert', error, [
        //         {
        //             text: 'OK',
        //             onPress: () => {
        //                 dispatch(resetError());
        //             },
        //         },
        //     ]);
        // }
    }, [error, data]);

    const onLogoutClick = async () => {
        dispatch(logoutAction())
        await AsyncStorage.removeItem('token')
        props.navigation.reset({
            routes: [{ name: 'Login' }]
        })
    }


    const onRecording = () => {
        // props.navigation.navigate('TransactionHistory')
        // props.navigation.navigate('NotificationList')

        // props.navigation.navigate('Subscription')
        props.navigation.navigate('RecordingScreen')

    }

    const onViewTicket = () => {
        props.navigation.navigate('ViewTickets')
    }

    const onProfile = () => {
        props.navigation.navigate('AccountSetting')
        // props.navigation.navigate('Profile')

    }

    const onNotification = () => {
        props.navigation.navigate('NotificationList')
        // props.navigation.navigate('RatingDetail')
    }

    const onMenu = () => {
        props.navigation.openDrawer();
        // props.navigation.dispatch(DrawerActions.openDrawer());
    }

    const onNewTicket = () => {
        props.navigation.navigate('PostTicket', { isEdit: false })
    }

    const onSettings = () => {
        props.navigation.navigate('SupportRequest')
    }

    return (
        <BaseContainer
            {...props}
            left={Assets.MENU}
            onLeft={onMenu}
            right={[Assets.PROFILE, Assets.NOTIFICATION]}
            onRight={[onProfile, onNotification]}
            title={"Home"}
        >
            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>

                {console.log("data ====>", JSON.stringify(data))}
                <View style={{ flex: 1 }}>
                    {/* <Image source={Assets.HOME_ICON} style={{ width: '100%' }} /> */}
                    <View style={{ paddingTop: 30, backgroundColor: colors.blue }}>
                        <RNSpeedometer labels={labels} minValue={0} maxValue={100} value={data ? parseInt(data.speedo_meter_count_in_percentage) : 0} size={300} />
                        <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 5, paddingHorizontal: 13, width: "100%", height: 100, alignItems: "flex-end", alignSelf: "center" }}>
                            <Text style={{ fontFamily: fonts.MEDIUM_500, color: colors.white, fontSize: 40, padding: 0, textAlign: "left" }}>{(data ? parseInt(data.speedo_meter_count_in_percentage) : 0) + "%"}</Text>
                            <View>
                                <Text style={{ fontFamily: fonts.MEDIUM_500, color: colors.white, fontSize: 16, paddingRight: 0, textAlign: "right" }}>{spreedometerData != null ? spreedometerData?.totalCaseTicketsWin + "/" + spreedometerData?.totalCaseTicketsWinLost : 0}</Text>
                                <Text style={{ fontFamily: fonts.MEDIUM_500, color: colors.white, fontSize: 13, paddingRight: 0, textAlign: "right" }}> {"Success Score"}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ backgroundColor: colors.light_white, padding: 10, margin: 10, borderRadius: 10, paddingBottom: 20 }}>
                        <HomeOption backgroundColor={colors.red} icon={Assets.RECORDING} title={'Panic Recording'} onPress={onRecording} />
                        <HomeOption backgroundColor={colors.blue} icon={Assets.VIEW_TICKET} title={'View Tickets in Progress'} onPress={onViewTicket} />
                        <HomeOption backgroundColor={colors.blue} icon={Assets.ADD_TICKET} title={'Post a New Ticket'} onPress={onNewTicket} />
                        <HomeOption backgroundColor={colors.blue} icon={Assets.SETTINGS} title={'Account Settings'} onPress={onProfile} />
                    </View>
                </View>
            </ScrollView>
        </BaseContainer>
    )
}

export default Home
