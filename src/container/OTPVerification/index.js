
import OTPInputView from '@twotalltotems/react-native-otp-input';
import React, { useEffect, useState } from 'react';
import { Alert, Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch, useSelector } from 'react-redux';
import { Assets } from '../../assets';
import Loader from '../../component/Loader';
import TextInputField from '../../component/TextInputField';
import colors from '../../utils/colors';
import { isEmpty } from '../../utils/constant';
import { fonts } from '../../utils/fonts';
import { resetError, verifyOTP } from './actions';
import { changePasswordAction, getOTPAction, resetError as errorResetPassword } from '../ChangePassword/action';
import styles from './styles';
import AsyncStorage from '@react-native-community/async-storage';
import PasswordReset from '../../component/PasswordReset';


const OTPVerification = (props) => {

    const [otp, setOTP] = useState('')
    const [isPasswordReset, setIsPasswordReset] = useState(false)
    const [isResend, setIsResend] = useState(false)
    const dispatch = useDispatch();
    const { successVerify, error, loading, success, errorReset,resetSuccess, loadingReset } = useSelector((state) => ({
        successVerify: state.OTPVerifyReducer.success,
        error: state.OTPVerifyReducer.error,
        loading: state.OTPVerifyReducer.loading,

        success: state.ChangePassword.resetSuccessfully,
        errorReset: state.ChangePassword.error,
        loadingReset: state.ChangePassword.loading,
        resetSuccess: state.ChangePassword.success
    }));

    const goBack = () => {
        props.navigation.goBack()
    }
    const [user, setUser] = useState(null)
    useEffect(async () => {
        console.log(" CHECK PROPS", props);
        let userData = await AsyncStorage.getItem('token');
        userData = JSON.parse(userData);
        console.log(" USER DATA ", userData);
        setUser(userData)
    }, []);

    useEffect(() => {
        console.log(" USER success", successVerify);
        console.log(" USER success 123", success);
        if (resetSuccess != null) {
            Alert.alert('Success', 'Resend otp send successfully', [
                {
                    text: 'OK',
                    onPress: () => {
                        dispatch(errorResetPassword());
                    },
                },
            ]);
        }
        if (success != null) {
            isShowPasswordModal(true)
            // alert(success)
            // Alert.alert('Success', success, [
            //     {
            //         text: 'OK',
            //         onPress: () => {
            //             dispatch(errorResetPassword());
            //             props.navigation.reset({
            //                 routes: [{ name: 'Home' }]
            //             })
            //         },
            //     },
            // ]);
        }
        if (successVerify != null) {
            // alert(success)
            Alert.alert('Success', successVerify, [
                {
                    text: 'OK',
                    onPress: () => {
                        dispatch(resetError());
                        props.navigation.navigate('ChangePassword', { mobile: props.route.params.email, otp: otp, isForgotPassword: true })
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
                    },
                },
            ]);
        }

        // if (errorReset != null) {
        //     Alert.alert('Alert', errorReset, [
        //         {
        //             text: 'OK',
        //             onPress: () => {
        //                 dispatch(errorResetPassword());
        //             },
        //         },
        //     ]);
        // }
    }, [error, successVerify, success,resetSuccess]);

    const onCodeChanged = (text) => {
        setOTP(text)
    }

    const checkValidation = () => {
        if (isEmpty(otp)) {
            alert("Please enter verification code.")
            return false
        }
        return true
    }

    const onGetStarted = () => {
        if (!checkValidation()) {
            return
        }
        // props.navigation.navigate('Home')
        if (props.route.params.isForgotPassword) {
            let data = {
                username: props.route.params.email,
                otp
            }
            dispatch(verifyOTP(data))
        } else {
            let data = {
                // username: user.email,
                old_password:props.route.params.currentPassword,
                password: props.route.params.newPassword,// "123456789",
                // confirm_password: props.route.params.confirmNewPassword,// "12345678",
                // otp
            }
            dispatch(changePasswordAction(data))
        }

    }

    const onTermsClick = () => {
        // props.navigation.navigate('SignUp')
        setIsResend(true)
        let data = {
            username: props.route.params.email
        }
        dispatch(getOTPAction(data))
    }

    const isShowPasswordModal = () => {
        setIsPasswordReset(true)
    }

    const onPasswordDone = () => {
        setIsPasswordReset(false)
        dispatch(errorResetPassword());
        props.navigation.reset({
            routes: [{ name: 'Home' }]
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
            {console.log(" USER 3333", success)}
            <KeyboardAwareScrollView style={styles.subContainer} contentContainerStyle={{ paddingBottom: 30 }} showsVerticalScrollIndicator={false}>
                <View style={{ marginTop: 20, alignItems: 'center' }}>
                    <Text style={styles.text}>{"OTP Verification"}</Text>
                    <Text style={{ marginHorizontal: 10, fontFamily: fonts.REGULAR, fontWeight: '500', marginTop: 10, color: colors.light_gray, fontSize: 16, textAlign: 'center' }}>
                        {'Enter the OTP sent to '}
                        <Text style={{ fontFamily: fonts.REGULAR, fontWeight: '700', color: colors.light_gray, }}>{props.route.params.email}</Text>
                    </Text>
                </View>

                <View style={{ marginHorizontal: 30, marginTop: 50 }}>
                    <Image source={Assets.OTP_CONFIRM} style={{ alignSelf: 'center' }} />

                    <OTPInputView
                        style={{ width: '90%', height: 70, alignSelf: 'center' }}
                        pinCount={4}
                        codeInputFieldStyle={styles.underlineStyleBase}
                        codeInputHighlightStyle={styles.underlineStyleHighLighted}
                        onCodeFilled={(code => {
                            console.log(`Code is ${code}, you are good to go!`)
                        })}
                        onCodeChanged={onCodeChanged}
                        onCodeFilled={() => { }}
                        code={otp}
                    />

                    <Text style={{ marginTop: 20, alignSelf: 'center', color: colors.light_blue, fontFamily: fonts.REGULAR, fontSize: 16, lineHeight: 30 }}>{"Didn`t receive OTP? "}
                        <Text style={{ color: colors.resend_color, fontFamily: fonts.SEMI_BOLD, fontSize: 16 }} onPress={onTermsClick}>{"RESEND"}</Text>
                    </Text>
                </View>
                <View style={{ marginTop: 20, justifyContent: 'space-between', marginHorizontal: 30 }}>
                    <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', borderRadius: 4, marginTop: 50, backgroundColor: colors.blue, padding: 20 }} onPress={onGetStarted}>
                        <Text style={{ color: colors.white, fontFamily: fonts.REGULAR, fontSize: 18, fontWeight: '400' }}>{"Verify & Continue"}</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}


export default OTPVerification
