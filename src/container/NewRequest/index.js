
import AsyncStorage from '@react-native-community/async-storage';
import { useIsFocused } from '@react-navigation/core';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Alert, Image, Platform, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSelector, useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import { Assets } from '../../assets';
import BaseContainer from '../../component/BaseContainer';
import Loader from '../../component/Loader';
import MTButton from '../../component/MTButton';
import PhotoSelect from '../../component/PhotoSelect';
import SocialMediaButton from '../../component/SocialMediaButton';
import TextInputField from '../../component/TextInputField';
import { getData } from '../../utils/AsyncStorageHelper';
import colors from '../../utils/colors';
import { isEmpty, isValidEmail } from '../../utils/constant';
import { fonts } from '../../utils/fonts';
import { getViewTicket, resetError as resetViewTicket } from '../ViewTickets/action';
import { newSupportRequest, resetError } from './actions';

const NewRequest = (props) => {


    const [title, setTitle] = useState('')
    const [ticket, setTicket] = useState(null)
    const [message, setMessage] = useState('')

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');


    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    const { caseTicket, success, error, loading } = useSelector((state) => ({
        success: state.NewRequest.success,
        error: state.NewRequest.error,
        loading: state.NewRequest.loading,
        caseTicket: state.ViewTicket.viewTicketList,
    }));

    useEffect(async () => {
        if (isFocused) {
            dispatch(resetViewTicket())
            console.log(" PROPS 22", props);
            let userData = await AsyncStorage.getItem('token');
            console.log(" USER DATA 111", userData);
            userData = JSON.parse(userData);
            console.log(" USER DATA ", userData);
            setTitle('')
            setTicket(null)
            setMessage('')
            setValue('')
            dispatch(getViewTicket())
        }
        // setUser(userData)
    }, [isFocused])


    useEffect(() => {
        console.log(" USER ", success);
        if (success != null) {
            console.log(" USER 111", success);
            Alert.alert('Success', 'Support Request generated successfully!', [
                {
                    text: 'OK',
                    onPress: () => {
                        dispatch(resetError());
                        goBack()
                    },
                },
            ]);
        }
        if (error != null) {
            Alert.alert('Alert', error, [
                {
                    text: 'OK',
                    onPress: () => {
                        dispatch(resetError());
                        goBack()
                    },
                },
            ]);
        }
    }, [error, success]);


    const goBack = () => {
        props.navigation.goBack()
    }

    const onTitleChange = (text) => {
        setTitle(text)
    }

    const onMessageChange = (text) => {
        setMessage(text)
    }

    const onProfile = () => {
        props.navigation.navigate('AccountSetting')
    }

    const onNotification = () => {

    }

    const onMenu = () => {
        props.navigation.openDrawer();
    }

    const checkValidation = ()=>{
        if (isEmpty(title)) {
            alert("Please enter title.")
            return false
        } else if (ticket == null) {
            alert("Please select ticket")
            return false
        } else if (isEmpty(message)) {
            alert("Please enter message.")
            return false
        }
        return true
    }

    const onSubmit = () => {
        if (!checkValidation()) {
            return
        }

        let formData = new FormData();
        formData.append('ticket_id', ticket.id)
        formData.append('title', title)
        formData.append('comment', message)

        console.log(" FORM DATA ", formData);

        dispatch(newSupportRequest(formData))
    }

    const setStateValue = (item) => {
        console.log(" CHECK ITEM ", item);

        let findData = caseTicket.filter(data => data.value == item)
        console.log(" FIND DATA ", findData);
        if (findData != undefined && findData.length > 0) {
            setTicket(findData[0])
        }

    }

    return (
        <BaseContainer
            {...props}
            left={Assets.MENU}
            onLeft={onMenu}
            right={[Assets.PROFILE, Assets.NOTIFICATION]}
            onRight={[onProfile, onNotification]}
            title={"New Request"}
        >
            {loading ? <Loader /> : null}
            {/* {renderPhotoSelection()} */}
            <KeyboardAwareScrollView style={{ marginHorizontal: 15, marginTop: 20 }} contentContainerStyle={{ paddingBottom: 30 }} showsVerticalScrollIndicator={false} >

                <View style={{ flex: 1 }}>

                    <TextInput
                        placeholder={"Support Tittle"}
                        style={{
                            borderWidth: 0.5, borderColor: colors.border_color, borderRadius: 5, marginTop: 20,
                            flex: 1,
                            fontFamily: fonts.REGULAR,
                            color: colors.input_color,
                            fontWeight: '400',
                            padding: 10,
                            margin: 0
                        }}
                        value={title}
                        onChangeText={onTitleChange}
                    />
                    {console.log(' caseTicket ', caseTicket)}
                    {caseTicket != null ? <DropDownPicker
                        open={open}
                        value={value}
                        items={caseTicket}
                        setOpen={setOpen}
                        setValue={setValue}
                        onChangeValue={setStateValue}
                        listMode={'SCROLLVIEW'}
                        style={{ marginTop: 20, borderWidth: 1, borderColor: colors.border_color, borderRadius: 5, height: 40 }}
                        textStyle={{ fontFamily: fonts.REGULAR, fontSize: 13, color: colors.text_light, opacity: 0.7 }}
                        labelStyle={{ padding: 2, zIndex: 999 }}
                        zIndex={6000}
                        zIndexInvers={1000}
                    /> : null}

                    {/* <TextInput
                        placeholder={"Ticket Listing"}
                        style={{
                            borderWidth: 0.5, borderColor: colors.border_color, borderRadius: 5, marginTop: 20,
                            flex: 1,
                            fontFamily: fonts.REGULAR,
                            color: colors.input_color,
                            fontWeight: '400',
                            padding: 10,
                            margin: 0
                        }}
                      
                    /> */}

                    <TextInput
                        placeholder={"Messages"}
                        style={{
                            borderWidth: 0.5, borderColor: colors.border_color, borderRadius: 5, marginTop: 20,
                            flex: 1,
                            fontFamily: fonts.REGULAR,
                            color: colors.input_color,
                            fontWeight: '400',
                            padding: 10,
                            margin: 0,
                            height: 120, textAlignVertical: 'top'
                        }}
                        multiline={true}
                        value={message}
                        onChangeText={onMessageChange}
                    />

                    <MTButton style={{ marginTop: 50, marginHorizontal: 0 }} title={'Submit'} onClick={onSubmit} />
                </View>

            </KeyboardAwareScrollView>
        </BaseContainer>
    )
}


export default NewRequest
