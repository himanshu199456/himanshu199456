
import AsyncStorage from '@react-native-community/async-storage';
import { useIsFocused } from '@react-navigation/core';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Image, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { Assets } from '../../assets';
import BaseContainer from '../../component/BaseContainer';
import HomeOption from '../../component/HomeOption';
import Loader from '../../component/Loader';
import MTHeader from '../../component/MTHeader';
import colors from '../../utils/colors';
import { fonts } from '../../utils/fonts';
import { getViewTicket } from '../ViewTickets/action';
import { getSupportRequest, resetError } from './action';
import { resetError as ticketError } from '../ViewTickets/action'

const SupportRequest = (props) => {

    const [user, setUser] = useState(null)
    const [isPressNew, setIsPressNew] = useState(false)
    const [isNext, setIsNext] = useState(false)
    const dispatch = useDispatch();
    const isFocused = useIsFocused();


    const { data, error, loading, caseTicket, caseTicketError } = useSelector((state) => ({
        data: state.SupportRequest.supportRequestList,
        error: state.SupportRequest.error,
        loading: state.SupportRequest.loading,
        caseTicket: state.ViewTicket.viewTicketList,
        caseTicketError: state.ViewTicket.error
    }));

    useEffect(async () => {
        dispatch(ticketError())
        console.log(" PROPS 22", props);
        let userData = await AsyncStorage.getItem('token');
        console.log(" USER DATA 111", userData);
        userData = JSON.parse(userData);
        console.log(" USER DATA ", userData);
        setUser(userData)
        if (isFocused) {
            setIsPressNew(false)
            dispatch(getSupportRequest())
        }

    }, [isFocused])

    useEffect(() => {
        if (caseTicket != null && isPressNew) {
            console.log(" case ticket ", caseTicket);
            props.navigation.navigate('NewRequest')
            setIsPressNew(false)
        }

        if (caseTicketError != null) {
            Alert.alert('Alert', 'You need to create a case before you can Raise Support Request.', [
                {
                    text: 'OK',
                    onPress: () => {
                        dispatch(ticketError());
                    },
                },
            ]);
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
    }, [caseTicket, caseTicketError]);

    const onProfile = () => {

    }

    const onNotification = () => {

    }

    const onMenu = () => {
        props.navigation.openDrawer();
    }

    const onItemClick = (item, index) => {
        props.navigation.navigate('SupportRequestDetail', { item })
    }

    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, borderRadius: 10, backgroundColor: colors.white, padding: 10 }} onPress={() => onItemClick(item, index)}>
                <View style={{ marginLeft: 10 }}>
                    <Text style={{ fontFamily: fonts.MEDIUM_500, color: colors.black, fontSize: 15 }}>{item.title}</Text>
                    <Text style={{ fontFamily: fonts.REGULAR_400, color: colors.black, marginTop: 5, fontSize: 10 }}>{item.content}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                        <Image source={{ uri: item.image }} style={{ width: 17, height: 17, borderRadius: 34 }} />
                        <Text style={{ fontFamily: fonts.REGULAR_400, color: colors.black, marginLeft: 5, fontSize: 10 }}>{item.assigned_to_user + ", " + moment(item.ticket_date).fromNow()}</Text>
                    </View>

                    <TouchableOpacity style={{ marginTop: 15, flexDirection: 'row', borderRadius: 4, backgroundColor: colors.blue, padding: 5, paddingHorizontal: 15, alignSelf: 'baseline' }}>
                        <Text style={{ color: colors.white, fontFamily: fonts.REGULAR, fontSize: 10, fontWeight: '500', }}>{item.status}</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ width: 21, height: 21, backgroundColor: colors.blue, borderRadius: 42, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontFamily: fonts.REGULAR, color: colors.white, fontSize: 10, }}>{item.comment_count}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    const onNewRequest = () => {
        setIsPressNew(true)
        dispatch(getViewTicket())
        // props.navigation.navigate('NewRequest')
    }

    return (
        <BaseContainer
            {...props}
            left={Assets.MENU}
            onLeft={onMenu}
            right={[Assets.PROFILE, Assets.NOTIFICATION]}
            onRight={[onProfile, onNotification]}
            title={"Support Request"}>
            {console.log(" DATA 123", data)}
            <View style={{ flex: 1, backgroundColor: colors.SCREEN_BACKGROUND, padding: 15 }}>
                {loading ? <Loader /> : null}
                <TouchableOpacity style={{ flexDirection: 'row', borderRadius: 4, alignItems: 'center', alignSelf: 'flex-end', backgroundColor: colors.blue, padding: 5, paddingHorizontal: 10 }} onPress={onNewRequest}>
                    <Image source={Assets.ADD} />
                    <Text style={{ color: colors.white, fontFamily: fonts.REGULAR, fontSize: 12, fontWeight: '500', marginLeft: 10 }}>{'New Request'}</Text>
                </TouchableOpacity>

                {data != null ?
                    <FlatList
                        data={data}
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

export default SupportRequest
