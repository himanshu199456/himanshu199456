
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
import { changePasswordAction, resetError } from './action';
import styles from './styles';

const MobileOTP = (props) => {

    const [mobileNumber, setMobileNumber] = useState('')


    const goBack = () => {
        props.navigation.goBack()
    }

    const onMobileChange = (text) => {
        setMobileNumber(text)
    }

    const checkValidation = () => {
        if (isEmpty(currentPassword)) {
            alert("Please enter current password.")
            return false
        }
        return true
    }

    const onGetStarted = () => {
        // if (!checkValidation()) {
        //     return
        // }

        // props.navigation.navigate('OTPVerification')
    }

    const onTermsClick = () => {
        props.navigation.navigate('SignUp')
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAwareScrollView style={styles.subContainer} contentContainerStyle={{ paddingBottom: 30 }} showsVerticalScrollIndicator={false}>
                <View style={{ marginTop: 20, alignItems: 'center' }}>
                    <Text style={styles.text}>{"Enter your Phone Number"}</Text>
                    <Text style={{ marginHorizontal: 10, fontFamily: fonts.REGULAR, fontWeight: '500', marginTop: 10, color: colors.light_gray, fontSize: 16, textAlign: 'center' }}>
                        {'We will send you the'}
                        <Text style={{ fontFamily: fonts.REGULAR,  color: colors.DARK_GRAY,fontWeight:'bold' }}>{' 4 digit '}</Text>
                        {'verification code'}
                    </Text>
                </View>

                <View style={{ marginHorizontal: 30, marginTop: 50 }}>
                    <Image source={Assets.OTP_ICON} style={{ alignSelf: 'center',width:200,height:200 }} resizeMode={'contain'} />
                    <TextInputField
                        title={'MOBILE NUMBER '}
                        placeholder={"Enter Your Mobile Number"}
                        onChangeText={onMobileChange}
                        inputValue={mobileNumber}
                    />
                </View>
                <View style={{marginTop:20, justifyContent: 'space-between', marginHorizontal: 30 }}>
                    <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', borderRadius: 4, marginTop: 50, backgroundColor: colors.blue, padding: 20,paddingVertical:14 }} onPress={onGetStarted}>
                        <Text style={{ color: colors.white, fontFamily: fonts.REGULAR, fontSize: 18, fontWeight: '400' }}>{"Send OTP"}</Text>
                    </TouchableOpacity>

                    <Text style={{ alignSelf: 'center', color: colors.light_blue, fontFamily: fonts.REGULAR, fontSize: 16, lineHeight: 30, marginTop: 35 }}>{"By signing up, you agree to "}
                        <Text style={{ color: colors.blue, fontFamily: fonts.SEMI_BOLD, fontSize: 16, lineHeight: 30, marginTop: 35 }} onPress={onTermsClick}>{"T&C"}</Text>
                    </Text>
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}


export default MobileOTP
