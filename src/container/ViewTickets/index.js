
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Image, SafeAreaView, ScrollView, Text, View,TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { Assets } from '../../assets';
import BaseContainer from '../../component/BaseContainer';
import HomeOption from '../../component/HomeOption';
import Loader from '../../component/Loader';
import colors from '../../utils/colors';
import { fonts } from '../../utils/fonts';
import { logoutAction } from '../Login/actions';
import { getViewTicket, resetError } from './action';
import { useIsFocused } from '@react-navigation/core';

const ViewTickets = (props) => {

    const [user, setUser] = useState(null)
    const dispatch = useDispatch();

    const { data, error, loading } = useSelector((state) => ({
        data: state.ViewTicket.viewTicketList,
        error: state.ViewTicket.error,
        loading: state.ViewTicket.loading,
    }));
    const isFocused = useIsFocused();
    useEffect(async () => {
        console.log(" PROPS 22", props);
        let userData = await AsyncStorage.getItem('token');
        console.log(" USER DATA 111", userData);
        userData = JSON.parse(userData);
        console.log(" USER DATA ", userData);

        setUser(userData)
        if (isFocused) {
            dispatch(getViewTicket())
        }
    }, [isFocused])

    // useEffect(() => {
    //     if (error != null) {
    //         Alert.alert('Alert', error, [
    //             {
    //                 text: 'OK',
    //                 onPress: () => {
    //                     dispatch(resetError());
    //                 },
    //             },
    //         ]);
    //     }
    // }, [error]);

    const returnString = (values) => {
        let newStr = '';

        values.map((data) => {
            newStr = newStr + data.violation_name + ","
        })

        return newStr.length > 0 ? newStr.substring(0, newStr.length - 1) : ''
    }

    const onItemClick = (item, index) => {
        props.navigation.navigate('PostTicket', { item, isEdit: true })
    }

    const renderItem = ({ item, index }) => {
        return (
            <View style={{ flex: 1, borderRadius: 5, backgroundColor: colors.light_white, margin: 10, marginTop: 20 }}>
                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: colors.blue, borderTopLeftRadius: 4, borderTopRightRadius: 4, padding: 10 }} onPress={() => onItemClick(item, index)}>
                    <Text style={{ fontFamily: fonts.REGULAR, fontSize: 16, color: colors.white }}>{"View Tickets"}</Text>
                    <TouchableOpacity onPress={() => props.navigation.navigate('Chat')}>
                        <Text style={{
                            backgroundColor: colors.white, color: colors.black, fontFamily: fonts.REGULAR,
                            fontSize: 10, paddingHorizontal: 15, paddingVertical: 5, borderRadius: 8
                        }}>{"Chat"}</Text>
                    </TouchableOpacity>
                </TouchableOpacity>

                <View style={{ flexDirection: 'row', marginHorizontal: 10, padding: 10, backgroundColor: colors.white, marginTop: 10 }}>
                    <Image source={Assets.IDENTIFICATION} />
                    <View style={{ justifyContent: 'space-between', marginLeft: 10 }}>
                        <Text style={{ fontFamily: fonts.BOLD_700, color: colors.black, fontSize: 11 }}>{"Lawyer Name"}</Text>
                        <Text style={{ fontFamily: fonts.REGULAR, color: colors.black, fontSize: 11, fontWeight: '400' }}>{item.attorney_name}</Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', marginHorizontal: 10, padding: 10, backgroundColor: colors.white, marginTop: 10 }}>
                    <Image source={Assets.SETTING_CHART} />
                    <View style={{ justifyContent: 'space-between', marginLeft: 10 }}>
                        <Text style={{ fontFamily: fonts.BOLD_700, color: colors.black, fontSize: 11 }}>{"Under Review"}</Text>
                        <Text style={{ fontFamily: fonts.REGULAR, color: colors.black, fontSize: 11, fontWeight: '400' }}>{item['current_status']}</Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', marginHorizontal: 10, padding: 10, backgroundColor: colors.white, marginTop: 10 }}>
                    <Image source={Assets.VIOLATION} />
                    <View style={{ justifyContent: 'space-between', marginLeft: 10 }}>
                        <Text style={{ fontFamily: fonts.BOLD_700, color: colors.black, fontSize: 11 }}>{"Violation"}</Text>
                        <Text style={{ fontFamily: fonts.REGULAR, color: colors.black, fontSize: 11, fontWeight: '400' }}>{returnString(item.ticket_violations)}</Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', marginHorizontal: 10, padding: 10, backgroundColor: colors.white, marginTop: 10 }}>
                    <Image source={Assets.CALENDER} />
                    <View style={{ justifyContent: 'space-between', marginLeft: 10 }}>
                        <Text style={{ fontFamily: fonts.BOLD_700, color: colors.black, fontSize: 11 }}>{"Date"}</Text>
                        <Text style={{ fontFamily: fonts.REGULAR, color: colors.black, fontSize: 11, fontWeight: '400' }}>{moment(item.ticket_date).format('DD/MM/YYYY')}</Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', marginHorizontal: 10, padding: 10, backgroundColor: colors.white, marginTop: 10, marginBottom: 10 }}>
                    <Image source={Assets.LOCATION} />
                    <View style={{ justifyContent: 'space-between', marginLeft: 10 }}>
                        <Text style={{ fontFamily: fonts.BOLD_700, color: colors.black, fontSize: 11 }}>{"Place"}</Text>
                        <Text style={{ fontFamily: fonts.REGULAR, color: colors.black, fontSize: 11, fontWeight: '400' }}>{item["city_name"]}</Text>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <BaseContainer
            {...props}
            title={"View Tickets "}>
            {loading ? <Loader /> : null}
            {data != null && data.length > 0 ? <FlatList
                data={data}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
            /> :
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontFamily: fonts.MEDIUM_500, fontSize: 16 }}>{"No Data Found!"}</Text>
                </View>
            }
            {/* <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                {loading ? <Loader /> : null}
                <View style={{ flex: 1, borderRadius: 5, backgroundColor: colors.light_white, margin: 10 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: colors.blue, borderTopLeftRadius: 4, borderTopRightRadius: 4, padding: 10 }}>
                        <Text style={{ fontFamily: fonts.REGULAR, fontSize: 16, color: colors.white }}>{"View Tickets"}</Text>
                        <Text style={{
                            backgroundColor: colors.white, color: colors.black, fontFamily: fonts.REGULAR,
                            fontSize: 10, paddingHorizontal: 15, paddingVertical: 5, borderRadius: 8
                        }}>{"Chat"}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', marginHorizontal: 10, padding: 10, backgroundColor: colors.white, marginTop: 10 }}>
                        <Image source={Assets.IDENTIFICATION} />
                        <View style={{ justifyContent: 'space-between', marginLeft: 10 }}>
                            <Text style={{ fontFamily: fonts.REGULAR, color: colors.black, fontSize: 11, fontWeight: '700' }}>{"Lawyer Name"}</Text>
                            <Text style={{ fontFamily: fonts.REGULAR, color: colors.black, fontSize: 11, fontWeight: '400' }}>{"Martin"}</Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', marginHorizontal: 10, padding: 10, backgroundColor: colors.white, marginTop: 10 }}>
                        <Image source={Assets.SETTING_CHART} />
                        <View style={{ justifyContent: 'space-between', marginLeft: 10 }}>
                            <Text style={{ fontFamily: fonts.REGULAR, color: colors.black, fontSize: 11, fontWeight: '700' }}>{"Under Review"}</Text>
                            <Text style={{ fontFamily: fonts.REGULAR, color: colors.black, fontSize: 11, fontWeight: '400' }}>{"Approval pending"}</Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', marginHorizontal: 10, padding: 10, backgroundColor: colors.white, marginTop: 10 }}>
                        <Image source={Assets.VIOLATION} />
                        <View style={{ justifyContent: 'space-between', marginLeft: 10 }}>
                            <Text style={{ fontFamily: fonts.REGULAR, color: colors.black, fontSize: 11, fontWeight: '700' }}>{"Violation"}</Text>
                            <Text style={{ fontFamily: fonts.REGULAR, color: colors.black, fontSize: 11, fontWeight: '400' }}>{"Disobeying, Ignoring or Misusing a Red Light"}</Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', marginHorizontal: 10, padding: 10, backgroundColor: colors.white, marginTop: 10 }}>
                        <Image source={Assets.CALENDER} />
                        <View style={{ justifyContent: 'space-between', marginLeft: 10 }}>
                            <Text style={{ fontFamily: fonts.REGULAR, color: colors.black, fontSize: 11, fontWeight: '700' }}>{"Date"}</Text>
                            <Text style={{ fontFamily: fonts.REGULAR, color: colors.black, fontSize: 11, fontWeight: '400' }}>{"25/8/2021"}</Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', marginHorizontal: 10, padding: 10, backgroundColor: colors.white, marginTop: 10 }}>
                        <Image source={Assets.LOCATION} />
                        <View style={{ justifyContent: 'space-between', marginLeft: 10 }}>
                            <Text style={{ fontFamily: fonts.REGULAR, color: colors.black, fontSize: 11, fontWeight: '700' }}>{"Place"}</Text>
                            <Text style={{ fontFamily: fonts.REGULAR, color: colors.black, fontSize: 11, fontWeight: '400' }}>{"California"}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView> */}
        </BaseContainer>
    )
}

export default ViewTickets
