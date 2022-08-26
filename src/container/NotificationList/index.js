
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Image, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Assets } from '../../assets';
import BaseContainer from '../../component/BaseContainer';
import Loader from '../../component/Loader';
import colors from '../../utils/colors';
import { fonts } from '../../utils/fonts';
import { getNotificationList } from './actions';

const NotificationList = (props) => {

    const [notificationPhoto, setNotificationPhoto] = useState(null)
    const [user, setUser] = useState(null)
    const [isNext, setIsNext] = useState(false)

    const dispatch = useDispatch();
    const { notificationList, error, loading } = useSelector((state) => ({
        notificationList: state.Notification.notificationList,
        error: state.Notification.error,
        loading: state.Notification.loading,
    }));


    useEffect(async () => {
        console.log(" PROPS 22", props);
        let userData = await AsyncStorage.getItem('token');
        console.log(" USER DATA 111", userData);
        userData = JSON.parse(userData);
        console.log(" USER DATA ", userData);
        setUser(userData)
        dispatch(getNotificationList())
    }, [])




    const onProfile = () => {

    }

    const onNotification = () => {

    }

    const onMenu = () => {
        props.navigation.openDrawer();
    }

    const renderItem = ({ item, index }) => {
        return (
            <View style={{ flexDirection: 'row', marginTop: 10, borderRadius: 10, backgroundColor: colors.white, padding: 10 }}>
                <View style={{ width: 70, height: 70, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', zIndex: 998, borderRadius: 140 }}>
                    <Image source={{ uri: item.image }} style={{ width: 70, height: 70, borderRadius: 140, }} />
                </View>
                <View style={{ marginLeft: 20, marginRight: 70 }}>
                    <Text style={{ fontFamily: fonts.MEDIUM_500, color: colors.black, fontSize: 12 }}>{item.title}</Text>
                    <Text style={{ fontFamily: fonts.REGULAR_400, color: colors.text_light, marginTop: 5, fontSize: 8 }}>{item.message}</Text>
                    <Text style={{ fontFamily: fonts.REGULAR_400, color: colors.black, marginTop: 5, fontSize: 8 }}>{moment(item["notification_date "]).calendar()}</Text>
                </View>

                {/* <View style={{ width: 21, height: 21, backgroundColor: colors.blue, borderRadius: 42, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontFamily: fonts.REGULAR, color: colors.white, fontSize: 10, }}>{"item.comment_count"}</Text>
                </View> */}
            </View>
        )
    }

    const onNewRequest = () => {
        props.navigation.navigate('NewRequest')
    }

    return (
        <BaseContainer
            // left={Assets.MENU}
            // onLeft={onMenu}
            // right={[Assets.PROFILE, Assets.NOTIFICATION]}
            // onRight={[onProfile, onNotification]}
            {...props}
            title={"Notification List"}>
            {console.log(" DATA ", notificationList)}
            {loading ? <Loader /> : null}
            <View style={{ flex: 1, backgroundColor: colors.SCREEN_BACKGROUND, padding: 15 }}>
                {notificationList != null && notificationList.length > 0 ?
                    <FlatList
                        data={notificationList}
                        renderItem={renderItem}
                        showsVerticalScrollIndicator={false}
                    /> :
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontFamily: fonts.MEDIUM_500, fontSize: 16 }}>{"No Data Found!"}</Text>
                    </View>
                }
            </View>
        </BaseContainer>
    )
}

export default NotificationList
