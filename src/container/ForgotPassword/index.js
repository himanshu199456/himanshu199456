
import React, { useEffect, useState } from 'react';
import { Alert, Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { Assets } from '../../assets';
import TextInputField from '../../component/TextInputField';
import colors from '../../utils/colors';
import { fonts } from '../../utils/fonts';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { isEmpty, isValidEmail } from '../../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPasswordAction, resetError } from './action';
import Loader from '../../component/Loader';
import BackWithSkip from '../../component/BackWithSkip';
import styles from './styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const ForgotPassword = (props) => {
    const { success, error, loading } = useSelector((state) => ({
        success: state.ForgotPassword.success,
        error: state.ForgotPassword.error,
        loading: state.ForgotPassword.loading,
    }));
    const [email, setEmail] = useState('')
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(" USER success forgot password ", success);
        if (success != null) {
            // alert(success)
            dispatch(resetError());
            props.navigation.navigate('OTPVerification', { email, isForgotPassword: true })
            
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
    }, [error, success]);

    const goBack = () => {
        props.navigation.goBack()
    }

    const onSkip = () => {
        props.navigation.navigate('AppIntro')
    }

    const onEmailChange = (text) => {
        setEmail(text)
    }

    const checkValidation = () => {
        if (isEmpty(email)) {
            alert("Please enter mobile number.")
            return false
        }
        // else if (!isValidEmail(email)) {
        //     alert("Please enter valid email address.")
        //     return false
        // }
        return true
    }

    const onGetStarted = () => {
        if (!checkValidation()) {
            return
        }

        let data = {
            username: email
        }
        dispatch(forgotPasswordAction(data))
    }

    return (
        <SafeAreaView style={styles.container}>
            {loading ? <Loader /> : null}
            <KeyboardAwareScrollView style={styles.subContainer} contentContainerStyle={{ flex: 1, paddingBottom: 30 }} showsVerticalScrollIndicator={false} >
                {/* <View style={styles.subContainer}> */}
                <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.text}>{"Forgot password"}</Text>
                </View>

                <View style={{ marginTop: 24, marginHorizontal: 10, justifyContent: 'center' }}>
                    <Image source={Assets.FORGOT_ICON} style={{ alignSelf: 'center' }} />
                    <Text style={{ fontFamily: fonts.REGULAR, fontWeight: '500', marginTop: 20, marginTop: 20, color: colors.black, fontSize: 20, textAlign: 'center' }}>{'Enter the mobile number associated with your account.'}</Text>
                    <Text style={{ marginHorizontal: 30, fontFamily: fonts.REGULAR, fontWeight: '500', marginTop: 20, color: colors.forgot_description, fontSize: 16, textAlign: 'center' }}>{'We will send you an OTP to reset your password.'}</Text>
                    <TextInputField
                        placeholder={'Enter mobile number'}
                        onChangeText={onEmailChange}
                        inputValue={email}
                        keyboardType={"phone-pad"}
                    />
                </View>
                <View style={{ flex: 1, marginHorizontal: 10, }} >
                    <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', borderRadius: 4, marginTop: 50, backgroundColor: colors.blue, padding: 20, paddingVertical: 16 }} onPress={onGetStarted}>
                        <Text style={{ color: colors.white, fontFamily: fonts.REGULAR, fontWeight: '400', fontSize: 18 }}>{"Send"}</Text>
                    </TouchableOpacity>
                </View>
                {/* </View> */}
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}


export default ForgotPassword
