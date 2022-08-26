
import AsyncStorage from '@react-native-community/async-storage';
import { useIsFocused } from '@react-navigation/core';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, FlatList, Image, ImageBackground, KeyboardAvoidingView, Platform, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSelector, useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import { Assets } from '../../assets';
import BaseContainer from '../../component/BaseContainer';
import Loader from '../../component/Loader';
import colors from '../../utils/colors';
import { fonts } from '../../utils/fonts';
import { getChatList, resetError, saveChatMessage } from './actions';
import styles from './styles';

const Chat = (props) => {

    const [message, setMessage] = useState('')
    const [user, setUser] = useState('')
    const flatListRef = useRef(null)
    const dispatch = useDispatch();
    const { error, loading, chatList, saveMessageSuccess } = useSelector((state) => ({
        chatList: state.Chat.chatList,
        error: state.Chat.error,
        loading: state.Chat.loading,
        saveMessageSuccess: state.Chat.saveMessageSuccess,
    }));

    const [yOffset, setYOffSet] = useState(0)
    const [isContentScroll, setContentScroll] = useState(true)
    const isFocused = useIsFocused();
    useEffect(async () => {
        console.log(" PROPS 22", props);
        let userData = await AsyncStorage.getItem('token');
        console.log(" USER DATA 111", userData);
        userData = JSON.parse(userData);
        console.log(" USER DATA ", userData);
        setUser(userData)
        if (isFocused) {
            dispatch(getChatList())
        }
    }, [isFocused])

    useEffect(() => {
        console.log(" USER ", saveMessageSuccess);
        if (saveMessageSuccess != null) {
            console.log(" USER 111", saveMessageSuccess);
            dispatch(resetError());
            dispatch(getChatList())
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
    }, [error, saveMessageSuccess]);

    const onMessageChange = (text) => {
        setMessage(text)
    }

    const onProfile = () => {
        props.navigation.navigate('Profile')
    }

    const onNotification = () => {

    }

    const onMenu = () => {
        props.navigation.openDrawer();
    }

    const renderItem = ({ item, index }) => {
        return (
            <View style={{ margin: 10, marginTop: 30 }}>
                <View style={{ flexDirection: item.sender_id != user.user_id ? 'row' : 'row-reverse', alignItems: 'flex-start' }}>
                    <Image source={{ uri: item.profile_image }} style={{ width: 42, height: 42, borderRadius: 84 }} />
                    <View style={{ width: '72%', marginLeft: item.sender_id != user.user_id ? 5 : 0, marginRight: item.sender_id == user.user_id ? 5 : 0, }}>
                        <View style={{
                            backgroundColor: item.sender_id == user.user_id ? colors.chat_background : colors.blue,
                            padding: 10, borderRadius: 10, borderBottomLeftRadius: 0
                        }}>
                            <Text style={{ fontFamily: fonts.REGULAR, fontWeight: '500', fontSize: 16, color: item.sender_id == user.user_id ? colors.black : colors.white }}>{item.sender_name}</Text>
                            <Text style={{ fontFamily: fonts.REGULAR, fontWeight: '400', fontSize: 12, color: item.sender_id == user.user_id ? colors.black : colors.white }}>{item.chat_message}</Text>
                        </View>
                        <Text style={{ marginTop: 5, fontSize: 12, fontFamily: fonts.REGULAR, fontWeight: '400', marginLeft: 2 }}>{item.chat_date_time}</Text>
                    </View>
                </View>
            </View>
        )
    }

    const handleScroll = e => {
        // scrollOffset = e.nativeEvent.contentOffset.y;

        if (parseInt(yOffset) <= e.nativeEvent.contentOffset.y) {
            setContentScroll(true)
        } else {
            setContentScroll(false)
        }

        setYOffSet(e.nativeEvent.contentOffset.y)
    };


    const onSendClick = () => {
        if (message == '') {
            return
        }

        let formData = new FormData();
        formData.append('chat_message', message)

        dispatch(saveChatMessage(formData))
        setMessage('')
    }

    return (
        <BaseContainer
            {...props}
            left={Assets.MENU}
            onLeft={onMenu}
            right={[Assets.PROFILE, Assets.NOTIFICATION]}
            onRight={[onProfile, onNotification]}
            title={"Chat"}
        >
            {loading ? <Loader /> : null}
            {console.log(" CHAT LIST ", chatList)}
            {/* <KeyboardAwareScrollView style={{ flex: 1, marginHorizontal: 10, marginTop: 20 }} contentContainerStyle={{ paddingBottom: 30 }} showsVerticalScrollIndicator={false} > */}
            <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? 'padding' : null}
                keyboardShouldPersistTaps={'always'}
                keyboardVerticalOffset={Platform.select({ ios: 100, android: 500 })}
                style={{ flex: 1, marginHorizontal: 10, marginTop: 20 }}
                contentContainerStyle={{ paddingBottom: 30 }}
                showsVerticalScrollIndicator={false}
            >
                <View style={{ flex: 1 }}>
                    {chatList != null && chatList.length > 0 ?
                        <FlatList
                            ref={flatListRef}
                            data={chatList}
                            style={{ flexGrow: 1 }}
                            showsVerticalScrollIndicator={false}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => item + index}
                            onScroll={handleScroll}
                            onLayout={() => {
                                flatListRef.current.scrollToEnd();
                            }}
                            onContentSizeChange={() => {
                                if (isContentScroll && flatListRef != null) {
                                    flatListRef.current.scrollToEnd()
                                }
                            }}
                        /> : null}
                </View>
                <View style={{
                    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 15, paddingVertical: 10,
                }}>
                    <TextInput
                        placeholder={'Write a comment'}
                        style={{
                            flex: 1, fontFamily: fonts.REGULAR, fontSize: 13, color: colors.black, backgroundColor: colors.white,
                            borderRadius: 30, borderColor: colors.light_gray_text, borderWidth: 1, padding: 10, paddingHorizontal: 20,
                            marginRight: 12
                        }}
                        value={message}
                        onChangeText={onMessageChange}
                    />
                    <TouchableOpacity onPress={onSendClick}>
                        <Image source={Assets.SEND_BLUE} />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
            {/* </KeyboardAwareScrollView> */}
        </BaseContainer>
    )
}


export default Chat
