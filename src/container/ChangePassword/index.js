
import AsyncStorage from '@react-native-community/async-storage';
import React, { useEffect, useState } from 'react';
import { Alert, Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch, useSelector } from 'react-redux';
import { Assets } from '../../assets';
import Loader from '../../component/Loader';
import PasswordReset from '../../component/PasswordReset';
import TextInputField from '../../component/TextInputField';
import colors from '../../utils/colors';
import { isEmpty } from '../../utils/constant';
import { fonts } from '../../utils/fonts';
import { changePasswordAction, forgotPasswordAction, getOTPAction, resetError } from './action';
import styles from './styles';

const ChangePassword = (props) => {
    const { success, error, loading, resetSuccessfully,forgotSuccessfully } = useSelector((state) => ({
        success: state.ChangePassword.success,
        error: state.ChangePassword.error,
        loading: state.ChangePassword.loading,
        resetSuccessfully: state.ChangePassword.resetSuccessfully,
        forgotSuccessfully:state.ChangePassword.forgotSuccessfully
    }));
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')
    const [isCurrentPasswordShow, setIsCurrentPasswordShow] = useState(false)
    const [isNewPasswordShow, setIsNewPasswordShow] = useState(false)
    const [isConfirmPasswordShow, setIsConfirmPasswordShow] = useState(false)
    const [isPasswordReset, setIsPasswordReset] = useState(false)
    const [user, setUser] = useState(null)

    const dispatch = useDispatch();

    useEffect(async () => {
        console.log(" PROPS 22", props);
        let userData = await AsyncStorage.getItem('token');
        console.log(" USER DATA 111", userData);
        userData = JSON.parse(userData);
        console.log(" USER DATA ", userData);
        setUser(userData)
    }, [])

    useEffect(() => {
        console.log(" USER success change password", success);
        console.log(" change password 4544 ", resetSuccessfully);

        if(forgotSuccessfully != null){
            Alert.alert('Alert', forgotSuccessfully, [
                {
                    text: 'OK',
                    onPress: () => {
                        dispatch(resetError());
                        props.navigation.reset({
                            routes: [{ name: 'Login' }]
                        })
                    },
                },
            ]);
        }

        if (resetSuccessfully != null) {
            isShowPasswordModal(true)
        }

        if (success != null) {
            // alert(success)
            // if (props.route.params.isForgotPassword) {
            //     isShowPasswordModal(true)
            // } else {
            dispatch(resetError());
            props.navigation.navigate('OTPVerification', { email: user.mobile, isForgotPassword: false, newPassword, confirmNewPassword,currentPassword })
            // }

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
    }, [error, success, resetSuccessfully,forgotSuccessfully]);

    const goBack = () => {
        props.navigation.goBack()
    }

    const onCurrentPasswordChange = (text) => {
        setCurrentPassword(text)
    }

    const onNewPasswordChange = (text) => {
        setNewPassword(text)
    }

    const onConfirmPasswordChange = (text) => {
        setConfirmNewPassword(text)
    }

    const onCurrentPasswordShow = () => {
        setIsCurrentPasswordShow(!isCurrentPasswordShow)
    }

    const onNewPasswordShow = () => {
        setIsNewPasswordShow(!isNewPasswordShow)
    }

    const onConfirmPasswordShow = () => {
        setIsConfirmPasswordShow(!isConfirmPasswordShow)
    }

    const checkValidation = () => {
        if (props.route.params != undefined && !props.route.params.isForgotPassword && isEmpty(currentPassword)) {
            alert("Please enter current password.")
            return false
        } else if (isEmpty(newPassword)) {
            alert("Please enter new password.")
            return false
        } else if (isEmpty(confirmNewPassword)) {
            alert("Please enter repeat password.")
            return false
        } else if (newPassword != confirmNewPassword) {
            alert("Password and Re-enter password does not match.")
            return false
        }
        return true
    }

    const onEmailChange = () => {

    }

    const onGetStarted = () => {
        if (!checkValidation()) {
            return
        }

        if (props.route.params != undefined && props.route.params.isForgotPassword) {
            let data = {
                username: props.route.params.mobile,
                password: newPassword,// "123456789",
                confirm_password: confirmNewPassword,// "12345678",
                otp: props.route.params.otp
            }
            dispatch(forgotPasswordAction(data))
        } else {
            let data = {
                username: user.email
            }
            dispatch(getOTPAction(data))
            // isShowPasswordModal(true)
        }
    }

    const isShowPasswordModal = () => {
        setIsPasswordReset(true)
    }

    const onPasswordDone = () => {
        setIsPasswordReset(false)
        dispatch(resetError());
        props.navigation.reset({
            routes: [{ name: 'Login' }]
        })
    }

    const renderPasswordReset = () => {
        return (
            <PasswordReset
                isVisible={isPasswordReset}
                onCloseClick={() => setIsPasswordReset(false)}
                onDoneClick={onPasswordDone}
            />
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            {loading ? <Loader /> : null}
            {renderPasswordReset()}
            <KeyboardAwareScrollView style={styles.subContainer} contentContainerStyle={{ paddingBottom: 30 }} showsVerticalScrollIndicator={false}>
                <View style={{ marginTop: 20, alignItems: 'center' }}>
                    <Text style={styles.text}>{"Change password"}</Text>
                </View>

                <View style={{ marginHorizontal: 30, }}>
                    <Image source={Assets.FORGOT_ICON} style={{ alignSelf: 'center' }} />
                    <Text style={{ fontFamily: fonts.REGULAR, fontWeight: '500', marginTop: 20, marginTop: 20, color: colors.black, fontSize: 20, textAlign: 'center' }}>{'Enter your new password'}</Text>
                    {console.log("!props.route.params.isForgotPassword", props.route.params)}
                    {props.route.params != undefined && !props.route.params.isForgotPassword ?
                        <TextInputField
                            placeholder={"Old password"}
                            onChangeText={onCurrentPasswordChange}
                            inputValue={currentPassword}
                            rightIcon={Assets.EYE}
                            onRightIcon={onCurrentPasswordShow}
                            secureTextEntry={!isCurrentPasswordShow}
                        /> : null}

                    <TextInputField
                        placeholder={"New password"}
                        onChangeText={onNewPasswordChange}
                        inputValue={newPassword}
                        rightIcon={Assets.EYE}
                        onRightIcon={onNewPasswordShow}
                        secureTextEntry={!isNewPasswordShow}
                    />

                    <TextInputField
                        placeholder={"Confirm password"}
                        onChangeText={onConfirmPasswordChange}
                        inputValue={confirmNewPassword}
                        rightIcon={Assets.EYE}
                        onRightIcon={onConfirmPasswordShow}
                        secureTextEntry={!isConfirmPasswordShow}
                    />

                    <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', borderRadius: 4, marginTop: 50, backgroundColor: colors.blue, padding: 20, paddingVertical: 10 }} onPress={onGetStarted}>
                        <Text style={{ color: colors.white, fontFamily: fonts.REGULAR, fontSize: 18, fontWeight: '400' }}>{"Change"}</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}


export default ChangePassword
