
import AsyncStorage from '@react-native-community/async-storage';
import React, { useEffect, useState } from 'react';
import { Alert, Image, Platform, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
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
import { addMember, resetError } from './action';
import styles from './styles';

const AddMember = (props) => {

    const { success, error, loading } = useSelector((state) => ({
        success: state.AddMember.success,
        error: state.AddMember.error,
        loading: state.AddMember.loading,
    }));

    const [name, setName] = useState('')
    const dispatch = useDispatch();

    useEffect(async () => {
        console.log(" PROPS 22", props);
        let userData = await AsyncStorage.getItem('token');
        console.log(" USER DATA 111", userData);
        userData = JSON.parse(userData);
        console.log(" USER DATA ", userData);
        // setUser(userData)
    }, [])

    useEffect(() => {
        console.log(" USER ", success);
        if (success != null) {
            console.log(" USER 111", success);
            Alert.alert('Success', success, [
                {
                    text: 'OK',
                    onPress: () => {
                        setName('')
                        dispatch(resetError())
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
                        dispatch(resetError())
                    },
                },
            ]);
        }
    }, [error, success]);

    const goBack = () => {
        props.navigation.goBack()
    }

    const onNameChange = (text) => {
        setName(text)
    }


    const checkValidation = () => {
        if (isEmpty(name)) {
            alert("Please enter full name.")
            return false
        }
        return true
    }



    const onProfile = () => {
        props.navigation.navigate('AccountSetting')
    }

    const onNotification = () => {

    }

    const onMenu = () => {
        props.navigation.openDrawer();
    }


    const onSubmit = () => {
        if (!checkValidation()) {
            return
        }
        let formData = new FormData();
        formData.append('name', name)

        console.log(' CHECK FORM DATA ', formData);
        // return
        dispatch(addMember(formData))
    }

    return (
        <BaseContainer
            {...props}
            left={Assets.MENU}
            onLeft={onMenu}
            right={[Assets.PROFILE, Assets.NOTIFICATION]}
            onRight={[onProfile, onNotification]}
            title={"Add member"}
        >
            {loading ? <Loader /> : null}
            <KeyboardAwareScrollView style={{ marginHorizontal: 15, marginTop: 20 }} contentContainerStyle={{ paddingBottom: 30 }} showsVerticalScrollIndicator={false} >

                <View style={{ flex: 1 }}>



                    <TextInputField
                        title={"FULL NAME"}
                        onChangeText={onNameChange}
                        inputValue={name}
                        placeholder={'Enter full name'}
                    />


                    <MTButton title={'Add member'} onClick={onSubmit} />
                </View>

            </KeyboardAwareScrollView>
        </BaseContainer>
    )
}


export default AddMember
