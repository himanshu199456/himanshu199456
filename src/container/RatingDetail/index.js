
import AsyncStorage from '@react-native-community/async-storage';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import { Rating } from 'react-native-ratings';
import { useDispatch } from 'react-redux';
import { Assets } from '../../assets';
import BaseContainer from '../../component/BaseContainer';
import HomeOption from '../../component/HomeOption';
import MTButton from '../../component/MTButton';
import MTHeader from '../../component/MTHeader';
import colors from '../../utils/colors';
import { fonts } from '../../utils/fonts';
import { logoutAction } from '../Login/actions';

const RatingDetail = (props) => {

    const [user, setUser] = useState(null)
    const [isNext, setIsNext] = useState(false)
    const dispatch = useDispatch();

    const categories = [
        "1", "1", "1", "1", "1",
    ]

    useEffect(async () => {
        console.log(" PROPS 22", props);
        let userData = await AsyncStorage.getItem('token');
        console.log(" USER DATA 111", userData);
        userData = JSON.parse(userData);
        console.log(" USER DATA ", userData);
        setUser(userData)
    }, [])

    const onLogoutClick = async () => {
        dispatch(logoutAction())
        await AsyncStorage.removeItem('token')
        props.navigation.reset({
            routes: [{ name: 'Login' }]
        })
    }

    const onChangePassword = () => {
        props.navigation.navigate('ChangePassword')
    }

    const onRecording = () => {
        props.navigation.navigate('ViewTickets')
    }

    const onViewTicket = () => {
        props.navigation.navigate('Subscription')
    }

    const onProfile = () => {

    }

    const onNotification = () => {

    }

    const onMenu = () => {
        props.navigation.openDrawer();
    }

    const renderItem = ({ item, index }) => {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, borderRadius: 10, backgroundColor: colors.white, borderBottomWidth: 1, padding: 10, paddingBottom: 20 }}>
                <View style={{
                    width: 55, height: 55, justifyContent: 'center', alignItems: 'center', shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.8,
                    shadowRadius: 2,
                    elevation: 5,
                    backgroundColor: colors.white,
                    borderRadius: 110
                }}>
                    <Image source={Assets.PLAY_AUDIO} style={{ width: 30, height: 30 }} />
                </View>


                <View style={{ marginHorizontal: 10 }}>
                    <Text style={{ fontFamily: fonts.REGULAR, color: colors.black, fontSize: 21 }}>{"PDJDAudioRecord.mp3"}</Text>
                    <Text>{"duration: 00:00 size : 5kb"}</Text>
                </View>

                <TouchableOpacity>
                    <Image source={Assets.OPTION} />
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <BaseContainer 
        {...props}
        left={Assets.MENU}
            onLeft={onMenu}
            right={[Assets.PROFILE, Assets.NOTIFICATION]}
            onRight={[onProfile, onNotification]}
            title={"Rating Details"}>
            <View style={{ flex: 1, backgroundColor: colors.white }}>

                <Text style={{ alignSelf: 'center', marginTop: 20, fontFamily: fonts.REGULAR, color: colors.black, fontSize: 24 }}>{"Rate your police officer?"}</Text>

                <View style={{ marginHorizontal: 20 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20 }}>
                        <View>
                            <Text style={{ fontFamily: fonts.REGULAR, color: colors.RATING_TEXT, fontWeight: '500' }}>{"Professionalism"}</Text>
                            <View style={{ marginTop: 10 }}>
                                <Rating
                                    ratingCount={5}
                                    imageSize={15}
                                    startingValue={4}
                                    style={{ alignSelf: 'flex-start' }}
                                />
                            </View>
                        </View>
                        <Text style={{
                            backgroundColor: colors.blue, color: colors.white, fontFamily: fonts.REGULAR,
                            fontSize: 10, paddingHorizontal: 15, paddingVertical: 5,
                        }}>{"Clear All"}</Text>
                    </View>

                    <View style={{ marginTop: 30 }}>
                        <Text style={{ fontFamily: fonts.REGULAR, color: colors.RATING_TEXT, fontWeight: '500' }}>{"Attitude"}</Text>
                        <View style={{ marginTop: 10 }}>
                            <Rating
                                ratingCount={5}
                                imageSize={15}
                                startingValue={4}
                                style={{ alignSelf: 'flex-start' }}
                            />
                        </View>
                    </View>

                    <View style={{ marginTop: 30 }}>
                        <Text style={{ fontFamily: fonts.REGULAR, color: colors.RATING_TEXT, fontWeight: '500' }}>{"Communication"}</Text>
                        <View style={{ marginTop: 10 }}>
                            <Rating
                                ratingCount={5}
                                imageSize={15}
                                startingValue={4}
                                style={{ alignSelf: 'flex-start' }}
                            />
                        </View>
                    </View>

                    <View style={{ marginTop: 30 }}>
                        <Text style={{ fontFamily: fonts.REGULAR, color: colors.RATING_TEXT, fontWeight: '500' }}>{"Overall Interaction"}</Text>
                        <View style={{ marginTop: 10 }}>
                            <Rating
                                ratingCount={5}
                                imageSize={15}
                                startingValue={4}
                                style={{ alignSelf: 'flex-start' }}
                            />
                        </View>
                    </View>
                </View>
                <View style={{ backgroundColor: colors.light_gray_text, height: 1, marginVertical: 30 }} />

                <View style={{ marginHorizontal: 20, }}>
                    <Text style={{ fontFamily: fonts.REGULAR, color: colors.black, fontSize: 24 }}>{"Your Comment"}</Text>

                    <TextInput
                        style={{ height: 160, marginTop: 20, padding: 10, fontFamily: fonts.REGULAR, backgroundColor: colors.COMMENT_BACKGROUND }}
                        multiline={true}

                    />


                    <MTButton title={'Submit Feedback'} style={{ alignSelf: 'center', marginBottom: 30 }} />
                </View>
            </View>
        </BaseContainer>
    )
}

export default RatingDetail
