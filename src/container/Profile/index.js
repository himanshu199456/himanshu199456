
import AsyncStorage from '@react-native-community/async-storage';
import React, { useEffect, useState } from 'react';
import { Alert, Image, Platform, SafeAreaView, Text, TextInput,PermissionsAndroid, TouchableOpacity, View } from 'react-native';
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
import { editUserProfile, resetError } from './actions';
import styles from './styles';

const Profile = (props) => {

    const { userDetail, error, loading } = useSelector((state) => ({
        userDetail: state.EditProfile.userDetail,
        error: state.EditProfile.error,
        loading: state.EditProfile.loading,
    }));
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [profileImage, setProfileImage] = useState(null)
    const [isProfileChange, setIsProfileChange] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const dispatch = useDispatch();

    useEffect(async () => {
        console.log(" PROPS 22", props);
        let userData = await AsyncStorage.getItem('token');
        console.log(" USER DATA 111", userData);
        userData = JSON.parse(userData);
        console.log(" USER DATA ", userData);
        setName(userData.fullName)
        setPhone(userData.mobile)
        setEmail(userData.email)
        setAddress(userData.address)
        setProfileImage({ uri: userData.profile_img })
        requestCameraPermission()
        // setUser(userData)
    }, [])

    useEffect(() => {
        console.log(" USER ", userDetail);
        if (userDetail != null) {
            console.log(" USER 111", userDetail);
            Alert.alert('Success', 'Your profile has been updated successfully', [
                {
                    text: 'OK',
                    onPress: () => {
                        dispatch(resetError());
                        if (props.route.params != undefined && props.route.params.isFromPayment) {
                            props.navigation.reset({
                                routes: [{ name: 'Home' }]
                            })
                        } else {
                            goBack()
                        }
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
    }, [error, userDetail]);

    const requestCameraPermission = async () => {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: "App Camera Permission",
              message:"App needs access to your camera ",
              buttonNeutral: "Ask Me Later",
              buttonNegative: "Cancel",
              buttonPositive: "OK"
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("Camera permission given");
          } else {
            console.log("Camera permission denied");
          }
        } catch (err) {
          console.warn(err);
        }
      };

    const goBack = () => {
        props.navigation.goBack()
    }

    const onSkip = () => {
        props.navigation.navigate('AppIntro')
    }

    const onEmailChange = (text) => {
        setEmail(text)
    }

    const onNameChange = (text) => {
        setName(text)
    }

    const onPhoneChange = (text) => {
        setPhone(text)
    }

    const onAddressChange = (text) => {
        setAddress(text)
    }

    const onProfile = () => {
        props.navigation.navigate('AccountSetting')
    }

    const onNotification = () => {

    }

    const onMenu = () => {
        props.navigation.openDrawer();
    }
    const onCloseClick = () => {
        setIsVisible(false)
    }

    const cameraClick = () => {
        launchCamera({
            mediaType: 'photo',
            quality: 0.5,
            // saveToPhotos: true
        }, response => {
            console.log(" IMAGES ", response);
            // setProfileURL(images)
            if (response.assets) {
                setIsProfileChange(true)
                setProfileImage(response.assets[0])
            }
            onCloseClick();
        })
    }

    const galleryClick = () => {
        launchImageLibrary({
            mediaType: 'photo',
            quality: 0.5,
            saveToPhotos: true,
            // selectionLimit: 5
        }, response => {
            console.log(" IMAGES ", response);
            if (response.assets) {
                setIsProfileChange(true)
                setProfileImage(response.assets[0])
            }
            onCloseClick();
        })
    }

    const renderPhotoSelection = () => {
        return (
            <PhotoSelect
                isVisible={isVisible}
                onCloseClick={onCloseClick}
                cameraClick={cameraClick}
                galleryClick={galleryClick}
            />
        );
    }

    const onSubmit = () => {
        let formData = new FormData();
        formData.append('fullName', name)
        formData.append('address', address)
        formData.append('email', email)
        formData.append('mobile', phone)

        if (isProfileChange) {
            formData.append('profile_img', {
                name: profileImage.fileName,
                type: profileImage.type,// 'image/jpeg',
                uri: Platform.OS === 'ios' ? profileImage.uri.replace('file://', '') : profileImage.uri,
            })
        }

        dispatch(editUserProfile(formData))
    }

    return (
        <BaseContainer
            {...props}
            isHideIcon={props.route.params != undefined ? props.route.params.isFromPayment : false}
            left={Assets.MENU}
            onLeft={onMenu}
            right={[Assets.PROFILE, Assets.NOTIFICATION]}
            onRight={[onProfile, onNotification]}
            title={"Account Profile"}
        >
            {loading ? <Loader /> : null}
            {renderPhotoSelection()}
            <KeyboardAwareScrollView style={{ marginHorizontal: 15, marginTop: 20 }} contentContainerStyle={{ paddingBottom: 30 }} showsVerticalScrollIndicator={false} >

                <View style={{ flex: 1 }}>
                    <View style={{ marginTop: 15, width: 180, height: 180, borderRadius: 200, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', zIndex: 998 }}>
                        <Image source={{ uri: profileImage != null ? profileImage.uri : "https://picsum.photos/200/300" }} style={{ width: 180, height: 180, borderRadius: 200, }} resizeMode={'cover'} />
                        <TouchableOpacity style={{
                            position: 'absolute', backgroundColor: colors.blue, width: 40, height: 40, borderRadius: 80,
                            bottom: 20, right: -10, justifyContent: 'center', alignItems: 'center', zIndex: 999
                        }} onPress={() => setIsVisible(true)}>
                            <Image source={Assets.CAMERA} />
                        </TouchableOpacity>
                    </View>


                    <TextInputField
                        title={"FULL NAME"}
                        onChangeText={onNameChange}
                        inputValue={name}
                    />

                    <TextInputField
                        title={"EMAIL"}
                        onChangeText={onEmailChange}
                        inputValue={email}
                        keyboardType={"email-address"}
                    />


                    <TextInputField
                        title={"Phone No"}
                        onChangeText={onPhoneChange}
                        inputValue={phone}
                    />

                    <TextInputField
                        inputStyle={{ height: 120, textAlignVertical: 'top' }}
                        title={"Address"}
                        onChangeText={onAddressChange}
                        inputValue={address}
                        multiline={true}
                    />

                    <MTButton title={'Save'} onClick={onSubmit} />
                </View>

            </KeyboardAwareScrollView>
        </BaseContainer>
    )
}


export default Profile
