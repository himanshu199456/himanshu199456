
import React, { useEffect, useState } from 'react';
import { Alert, Image, Platform, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { Assets } from '../../assets';
import TextInputField from '../../component/TextInputField';
import colors from '../../utils/colors';
import { fonts } from '../../utils/fonts';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch, useSelector } from 'react-redux';
import { registerUserAction, resetError } from './actions';
import Loader from '../../component/Loader';
import { isEmpty, isValidEmail } from '../../utils/constant';
import styles from './styles';
import SocialMediaButton from '../../component/SocialMediaButton';
import CheckBox from 'react-native-check-box'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
var DeviceInfo = require('react-native-device-info');
import { appleAuth } from '@invertase/react-native-apple-authentication';


const SignUp = (props) => {

    const { user, error, loading } = useSelector((state) => ({
        user: state.Signup.user,
        error: state.Signup.error,
        loading: state.Signup.loading,
    }));

    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [mobileNumber, setMobileNumber] = useState('')
    const [referalCode, setReferalCode] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [isTermsChecked, setIsTermsChecked] = useState(false)

    const dispatch = useDispatch();
    useEffect(() => {
        console.log(" USER ", user);
        if (user != null) {
            console.log(" USER 111", user);
            // props.navigation.navigate('Subscription', { isSocial: true, dataToPass: userData })
            if (!user.user_subscription_valid) {
                // if (Platform.OS == 'ios' && !user.isSubscriptionOn) {
                //     props.navigation.reset({
                //         routes: [{ name: 'Home' }]
                //     })
                // } else {
                    props.navigation.reset({
                        routes: [{ name: 'Subscription' }]
                    })
                // }
            } else {
                if (user.email != null && user.mobile != null && user.fullName != null) {
                    props.navigation.reset({
                        routes: [{ name: 'Home' }]
                    })
                } else {
                    props.navigation.reset({
                        routes: [{ name: 'Profile', params: { isFromPayment: true } }]
                    })
                }
            }
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
    }, [error, user]);

    const goBack = () => {
        props.navigation.goBack()
    }

    const onSkip = () => {
        props.navigation.navigate('AppIntro')
    }

    const onFullNameChange = (text) => {
        setFullName(text)
    }

    const onEmailChange = (text) => {
        setEmail(text)
    }

    const onPasswordChange = (text) => {
        setPassword(text)
    }

    const onCodeChange = (text) => {
        setReferalCode(text)
    }

    const onMobileChange = (text) => {
        setMobileNumber(text)
    }

    const onRightIconClick = () => {
        setShowPassword(!showPassword)
    }

    const onConfirmRightIconClick = () => {
        setShowConfirmPassword(!showConfirmPassword)
    }

    const checkValidation = () => {
        if (isEmpty(mobileNumber)) {
            alert("Please enter mobile number.")
            return false
        } else if (isEmpty(fullName)) {
            alert("Please enter full name.")
            return false
        } else if (isEmpty(email)) {
            alert("Please enter email address.")
            return false
        } else if (!isValidEmail(email)) {
            alert("Please enter valid email address.")
            return false
        } else if (isEmpty(password)) {
            alert("Please enter password.")
            return false
        } else if (!isTermsChecked) {
            alert("Please accept terms and conditions.")
            return false
        } else
            return true
    }

    const onSignupClick = () => {
        if (!checkValidation()) {
            return
        }

        let userData = new FormData();
        userData.append('fullName', fullName)
        userData.append('mobile', mobileNumber)
        userData.append('email', email)
        userData.append('password', password)
        userData.append('term_conditions', isTermsChecked ? 1 : 0)
        userData.append('device_token', DeviceInfo.getUniqueId())

        if(referalCode != ''){
            userData.append('referral_code',referalCode)
        }
        // userData.append('referral_code', '')
        // userData.append('access_token', '')
        // userData.append('social_login_type', '')
        // userData.append('access_token', "svvnfvbdshjb")
        console.log(" CHECK DATA ", userData);
        // return
        dispatch(registerUserAction(userData))
    }

    const onGoogleLogin = async () => {
        const { idToken, user } = await GoogleSignin.signIn();
        const googleToken = await GoogleSignin.getTokens();
        console.log(" GOOGLE TOKEN googleToken", googleToken);
        // const { idToken, user } = await GoogleSignin.signIn();
        // console.log(" GOOGLE TOKEN ", idToken);
        console.log(" GOOGLE TOKEN user", user);

        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        // Sign-in the user with the credential
        const googleAuth = await auth().signInWithCredential(googleCredential);
        console.log(" GOOGLE TOKEN user 111 ", googleAuth);
        let dataToPass = googleAuth.additionalUserInfo.profile

        let userData = new FormData()
        userData.append('fullName', user.familyName + ' ' + user.givenName)
        userData.append('email', user.email)
        userData.append('term_conditions', isTermsChecked ? 1 : 0)
        userData.append('device_token', DeviceInfo.getUniqueId())
        userData.append('access_token', googleToken.accessToken)
        userData.append('social_login_type', 'google')
        userData.append('device_type', Platform.OS)

        console.log(" CHECK DATA ", userData);
        dispatch(registerUserAction(userData))
    }

    const onFaceBookLogin = () => {

    }

    const onAppleLogin = async () => {
        const appleAuthRequestResponse = await appleAuth.performRequest({
            requestedOperation: appleAuth.Operation.LOGIN,
            requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME,],
        });
        console.log("appleAuthRequestResponse", appleAuthRequestResponse);
        // get current authentication state for user
        // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
        const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);

        // use credentialState response to ensure the user is authenticated
        if (credentialState === appleAuth.State.AUTHORIZED) {
            // user is authenticated
            // alert('Apple login successfully...')


            let userData = new FormData()
            if (appleAuthRequestResponse.email && appleAuthRequestResponse.fullName.familyName) {
                userData.append('fullName', appleAuthRequestResponse.fullName.familyName + ' ' + appleAuthRequestResponse.fullName.givenName)
                userData.append('email', appleAuthRequestResponse.email)
            }

            userData.append('term_conditions', isTermsChecked ? 1 : 0)
            userData.append('device_token', DeviceInfo.getUniqueId())
            userData.append('access_token', appleAuthRequestResponse.user)
            userData.append('social_login_type', 'apple')
            userData.append('device_type', Platform.OS)

            console.log(" CHECK DATA ", userData);
            dispatch(registerUserAction(userData))
        }
    }

    const onCheckboxClick = () => {
        setIsTermsChecked(!isTermsChecked)
    }

    // const onSignupClick = () => {
    //     console.log(" MOBILE NUMBER ", mobileNumber);
    //     console.log(" FULL NAME ", mobileNumber);
    //     console.log(" EMAIL ", email);
    //     console.log(" PASSWORD ", password);
    // }

    const onClick = () => {
        props.navigation.navigate('TermsAndCondition')
    }

    return (
        <SafeAreaView style={styles.container}>
            {loading ? <Loader /> : null}
            <KeyboardAwareScrollView style={{ flex: 1, marginHorizontal: 16 }} contentContainerStyle={{ paddingBottom: 30 }} showsVerticalScrollIndicator={false}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.signUpText}>{"Let’s  gets  started  by creating an account ... "}</Text>
                </View>

                <TextInputField
                    placeholder={'016 100-1000'}
                    title={"MOBILE NUMBER:"}
                    onChangeText={onMobileChange}
                    inputValue={mobileNumber}
                    keyboardType={"phone-pad"}
                />

                <TextInputField
                    placeholder={'Enter your name'}
                    title={"FULL NAME"}
                    onChangeText={onFullNameChange}
                    inputValue={fullName}
                />

                <TextInputField
                    title={"EMAIL"}
                    placeholder={'Enter your Email'}
                    onChangeText={onEmailChange}
                    inputValue={email}
                    keyboardType={"email-address"}
                />

                <TextInputField
                    title={"PASSWORD"}
                    placeholder={'Enter password'}
                    onChangeText={onPasswordChange}
                    inputValue={password}
                    rightIcon={Assets.EYE}
                    onRightIcon={onRightIconClick}
                    secureTextEntry={!showPassword}
                />

                <TextInputField
                    title={"REFERAL CODE"}
                    placeholder={'Enter code'}
                    onChangeText={onCodeChange}
                    inputValue={referalCode}
                />

                <View style={{ marginTop: 15, flexDirection: 'row', alignItems: 'center' }}>
                    <CheckBox
                        style={{ flex: 1, }}
                        onClick={onCheckboxClick}
                        isChecked={isTermsChecked}
                        rightTextView={<Text style={{ fontSize: 13, fontFamily: fonts.REGULAR, color: colors.black, marginLeft: 10 }}>{"By Signing Up you Agree "}
                            <Text style={{ fontFamily: fonts.SEMI_BOLD, color: colors.blue }} onPress={onClick}>{"Terms & Conditions"}</Text>
                        </Text>}
                        checkedCheckBoxColor={colors.blue}
                        uncheckedCheckBoxColor={colors.black}
                    />
                </View>

                <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', borderRadius: 4, marginTop: 38, backgroundColor: colors.blue, padding: 20, paddingVertical: 16 }} onPress={onSignupClick}>
                    <Text style={{ color: colors.white, fontSize: 18 }}>{"Sign up"}</Text>
                </TouchableOpacity>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 35 }}>
                    <SocialMediaButton borderColor={colors.google_color} title={"Google"} icon={Assets.GOOGLE} onPress={onGoogleLogin} />
                    {/* <SocialMediaButton borderColor={colors.facebook_color} title={"Facebook"} icon={Assets.FACEBOOK} onPress={onFaceBookLogin} /> */}
                    {Platform.OS == 'ios' ? <SocialMediaButton borderColor={colors.black} title={"Apple"} icon={Assets.APPLE} onPress={onAppleLogin} /> : null}
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}


export default SignUp
