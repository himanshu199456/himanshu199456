
import AsyncStorage from '@react-native-community/async-storage';
import { useIsFocused } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { Alert, Image, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSelector, useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import { Assets } from '../../assets';
import BaseContainer from '../../component/BaseContainer';
import Loader from '../../component/Loader';
import colors from '../../utils/colors';
import { fonts } from '../../utils/fonts';
import { logoutAction } from '../Login/actions';
import styles from './styles';

const AccountSetting = (props) => {


    const [user, setUser] = useState(null)
    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    useEffect(async () => {
        console.log(" PROPS 22", props);
        if (isFocused) {
            getUserData();
        }
    }, [isFocused])

    const getUserData = async () => {
        console.log(" PROPS 22", props);
        let userData = await AsyncStorage.getItem('token');
        console.log(" USER DATA 111", userData);
        userData = JSON.parse(userData);
        console.log(" USER DATA ", userData);
        setUser(userData)
    }

    const onProfile = () => {
        props.navigation.navigate('Profile')
    }

    const onMenu = () => {
        props.navigation.openDrawer();
    }

    const onChangePassword = () => {
        props.navigation.navigate('ChangePassword',{isForgotPassword:false})
    }

    const onLogout = async () => {
        dispatch(logoutAction())
        await AsyncStorage.removeItem('token')
        props.navigation.reset({
            routes: [{ name: 'Login' }]
        })
    }


    const onEditProfile = () => {
        props.navigation.navigate('Profile')
    }

    const onNotification = () => {
        props.navigation.navigate('NotificationList')
    }

    const onPayment = () => {
        props.navigation.navigate('TransactionHistory')
    }

    const onAddMember = () => {
        props.navigation.navigate('AddMember')
    }

    return (
        <BaseContainer
            {...props}
            left={Assets.MENU}
            onLeft={onMenu}
            right={[Assets.PROFILE, Assets.NOTIFICATION]}
            onRight={[onProfile, onNotification]}
            title={"Account Setting"}
        >
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <View style={styles.profileView}>
                        <Image source={{ uri: user != null && user.profile_img != undefined ? user.profile_img : "https://picsum.photos/200/300" }} style={styles.profileImage} resizeMode={'cover'} />
                    </View>

                    {user != null ? <View style={styles.userDetailContainer}>
                        <View style={styles.userNameView}>
                            <Text style={styles.userName}>{user.fullName || ''}</Text>
                            <TouchableOpacity onPress={onEditProfile}>
                                <Image source={Assets.EDIT} />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.userDetailText}>{user.email || ""}</Text>
                        <Text style={styles.userDetailText}>{user.mobile || ""}</Text>
                        <Text style={styles.userDetailText}>{user.address || ""}</Text>
                    </View> : null}
                </View>

                <View style={{ marginTop: 30 }}>
                    <View style={styles.accountView}>
                        <Text style={styles.accountText}>{"Accounts"}</Text>
                    </View>
                    <View style={styles.accountOptionView}>
                        <TouchableOpacity style={styles.optionView} onPress={onChangePassword}>
                            <Image source={Assets.LOCK} />
                            <Text style={styles.optionText}>{"Change Password"}</Text>
                            <Image source={Assets.RIGHT_ARROW} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.optionView} onPress={onNotification}>
                            <Image source={Assets.BELL} />
                            <Text style={styles.optionText}>{"Notification "}</Text>
                            <Image source={Assets.RIGHT_ARROW} />
                        </TouchableOpacity>

                        {user != null &&user.user_id != '89' ? <TouchableOpacity style={styles.optionView} onPress={onPayment}>
                            <Image source={Assets.WALLET} />
                            <Text style={styles.optionText}>{"Payment"}</Text>
                            <Image source={Assets.RIGHT_ARROW} />
                        </TouchableOpacity> : null}

                        {user != null && user.show_sub_user_list ? <TouchableOpacity style={styles.optionView} onPress={onAddMember}>
                            <Image source={Assets.PROFILE} style={{ tintColor: colors.black }} />
                            <Text style={styles.optionText}>{"Add Family Member"}</Text>
                            <Image source={Assets.RIGHT_ARROW} />
                        </TouchableOpacity> : null}

                        <TouchableOpacity style={styles.optionView} onPress={onLogout}>
                            <Image source={Assets.SIGNOUT} />
                            <Text style={styles.optionText}>{"Sign Out"}</Text>
                            <Image source={Assets.RIGHT_ARROW} />
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        </BaseContainer>
    )
}


export default AccountSetting
