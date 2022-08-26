
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import React, { useEffect, useState } from 'react';
import { Alert, Image, Platform, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSelector, useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import { Assets } from '../../assets';
import Loader from '../../component/Loader';
import SocialMediaButton from '../../component/SocialMediaButton';
import TextInputField from '../../component/TextInputField';
import { getData } from '../../utils/AsyncStorageHelper';
import colors from '../../utils/colors';
import { isEmpty, isValidEmail } from '../../utils/constant';
import { fonts } from '../../utils/fonts';
import { getLoginDetails, resetError } from './actions';
import styles from './styles';
import auth from '@react-native-firebase/auth';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import { registerUserAction } from '../SignUp/actions';
import AsyncStorage from '@react-native-community/async-storage';

var DeviceInfo = require('react-native-device-info');

const Login = (props) => {

    const { user, error, loading, signUpUser, signUpLoading, signUpError } = useSelector((state) => ({
        user: state.Login.user,
        error: state.Login.error,
        loading: state.Login.loading,

        signUpUser: state.Signup.user,
        signUpError: state.Signup.error,
        signUpLoading: state.Signup.loading
    }));
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [isKeyboardShow, setIsKeyboardShow] = useState(false)
    const dispatch = useDispatch();

    useEffect(async () => {
        GoogleSignin.configure({
            webClientId: '936976411238-51sip6mngkvo41umgvnf7c27pad7cb48.apps.googleusercontent.com',
        });

        console.log(" USER ", user);
        if (user != null) {
            console.log(" USER 111", user);
            setEmail('')
            setPassword('')
            // props.navigation.reset({
            //     routes: [{ name: 'Home' }]
            // })
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

        if (signUpUser != null) {
            console.log(" USER 111", signUpUser);
            // props.navigation.reset({
            //     routes: [{ name: 'Subscription' }]
            // })
            if (!signUpUser.user_subscription_valid) {
                props.navigation.reset({
                    routes: [{ name: 'Subscription' }]
                })
            } else {
                if (signUpUser.email != null && signUpUser.mobile != null && signUpUser.fullName != null) {
                    props.navigation.reset({
                        routes: [{ name: 'Home' }]
                    })
                } else {
                    props.navigation.reset({
                        routes: [{ name: 'Profile', params: { isFromPayment: true } }]
                    })
                }
                // props.navigation.reset({
                //     routes: [{ name: 'Home' }]
                // })
            }
        }
        if (signUpError != null) {
            Alert.alert('Alert', signUpError, [
                {
                    text: 'OK',
                    onPress: () => {
                        dispatch(resetError());
                    },
                },
            ]);
        }
    }, [error, user, signUpError, signUpUser]);

    const goBack = () => {
        props.navigation.goBack()
    }

    const onSkip = () => {
        props.navigation.navigate('AppIntro')
    }

    const onEmailChange = (text) => {
        setEmail(text)
    }

    const onPasswordChange = (text) => {
        setPassword(text)
    }

    const onRightIconClick = () => {
        setShowPassword(!showPassword)
    }

    const checkValidation = () => {
        if (isEmpty(email)) {
            alert("Please enter email address.")
            return false
        } else if (isEmpty(password)) {
            alert("Please enter password.")
            return false
        }
        return true
    }

    const onGetStarted = () => {

        if (!checkValidation()) {
            return
        }
        let userData = new FormData();
        userData.append('email', email)
        userData.append('password', password)
        userData.append('login_type', "email")

        dispatch(getLoginDetails(userData))
    }

    const onForgotPasswordClick = () => {
        props.navigation.navigate('ForgotPassword')
    }

    const onLoginClick = () => {
        if (!checkValidation()) {
            return
        }
        let userData = {
            username: email,
            password: password,
            device_token: DeviceInfo.getUniqueId()
        }

        dispatch(getLoginDetails(userData))
        // props.navigation.navigate('MobileOTP')
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

        // let userData
        // userData.fullName = user.familyName + ' ' + user.givenName
        // userData.email = user.email
        // userData.term_conditions = isTermsChecked ? 1 : 0
        // userData.device_token = DeviceInfo.getUniqueId()
        // userData.access_token = googleToken.accessToken
        // userData.social_login_type = 'google'
        // userData.device_type = Platform.OS

        let userData = new FormData()
        userData.append('fullName', user.familyName + ' ' + user.givenName)
        userData.append('email', user.email)
        userData.append('term_conditions', 1)
        userData.append('device_token', DeviceInfo.getUniqueId())
        userData.append('access_token', googleToken.accessToken)
        userData.append('social_login_type', 'google')
        userData.append('device_type', Platform.OS)

        console.log(" CHECK DATA ", userData);
        dispatch(registerUserAction(userData))
        // props.navigation.navigate('MobileOTP')
        // props.navigation.navigate('Home')
    }

    const onFaceBookLogin = () => {
        // props.navigation.navigate('ChangePassword')
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

            userData.append('term_conditions', 1)
            userData.append('device_token', DeviceInfo.getUniqueId())
            userData.append('access_token', appleAuthRequestResponse.user)
            userData.append('social_login_type', 'apple')
            userData.append('device_type', Platform.OS)

            console.log(" CHECK DATA ", userData);
            dispatch(registerUserAction(userData))
        }
    }

    const onSignUpClick = () => {
        props.navigation.navigate('SignUp')
    }

    const onKeyboardShow = () => {
        console.log(" KEYBOARD SHOW ");
        setIsKeyboardShow(true)
    }

    const onKeyboardHide = () => {
        console.log(" KEYBOARD HIDE ");
        setIsKeyboardShow(false)
    }

    return (
        <SafeAreaView style={styles.container}>
            {loading || signUpLoading ? <Loader /> : null}
            {/* <View style={{ flex: 1, marginHorizontal: 16 }}> */}
            <KeyboardAwareScrollView style={{ flex: 1, marginHorizontal: 16 }} contentContainerStyle={{ flex: 1, paddingBottom: 30 }} showsVerticalScrollIndicator={false}
                onKeyboardDidShow={onKeyboardShow}
                onKeyboardDidHide={onKeyboardHide}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.loginText}>{"Sign in"}</Text>
                </View>
                <View style={{ flex: 3, marginHorizontal: 10 }}>

                    <TextInputField
                        title={"MOBILE NUMBER"}
                        placeholder={'016 100-1000'}
                        onChangeText={onEmailChange}
                        inputValue={email}
                        keyboardType={"phone-pad"}
                    />

                    <TextInputField
                        title={"PASSWORD"}
                        placeholder={'Enter password'}
                        onChangeText={onPasswordChange}
                        inputValue={password}
                        secureTextEntry={true}
                    />

                    <TouchableOpacity style={{ alignSelf: 'flex-end' }} onPress={onForgotPasswordClick}>
                        <Text style={styles.forgotPasswordText}>{"Forgot password?"}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', borderRadius: 4, marginTop: 35, backgroundColor: colors.blue, padding: 20, paddingVertical: 14 }} onPress={onLoginClick}>
                        <Text style={{ color: colors.white, fontFamily: fonts.REGULAR, fontWeight: '400', fontSize: 18 }}>{"Sign in"}</Text>
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 35, }}>
                        <SocialMediaButton borderColor={colors.google_color} title={"Google"} icon={Assets.GOOGLE} onPress={onGoogleLogin} />
                        {/* <SocialMediaButton borderColor={colors.facebook_color} title={"Facebook"} icon={Assets.FACEBOOK} onPress={onFaceBookLogin} /> */}
                        {Platform.OS == 'ios' ? <SocialMediaButton borderColor={colors.black} title={"Apple"} icon={Assets.APPLE} onPress={onAppleLogin} /> : null}
                    </View>
                </View>
                {!isKeyboardShow ?
                    <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 20, alignItems: 'center', }}>
                        <Text style={{ color: colors.light_blue, fontFamily: fonts.REGULAR, fontSize: 16, lineHeight: 30, marginTop: 35 }}>{"Not a member yet? "}
                            <Text style={{ color: colors.blue, fontFamily: fonts.SEMI_BOLD, fontSize: 16, lineHeight: 30, marginTop: 35 }} onPress={onSignUpClick}>{"Signup"}</Text>
                        </Text>
                    </View>
                    : null}
                {/* </View> */}
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}


export default Login
