
import React, { useEffect, useState } from 'react';
import { Alert, Image, ImageBackground, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSelector, useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import { Assets } from '../../assets';
import BaseContainer from '../../component/BaseContainer';
import Loader from '../../component/Loader';
import colors from '../../utils/colors';
import { isEmpty, isValidEmail } from '../../utils/constant';
import { fonts } from '../../utils/fonts';
import { referFriend, resetError } from './actions';
import styles from './styles';

const ReferFriend = (props) => {

    const [email, setEmail] = useState('')
    const dispatch = useDispatch();
    const { error, loading, referSuccess } = useSelector((state) => ({

        error: state.Refer.error,
        loading: state.Refer.loading,
        referSuccess: state.Refer.referSuccess,
    }));
    useEffect(() => {
        console.log(" USER ", referSuccess);
        if (referSuccess != null) {
            console.log(" USER 111", referSuccess);
            setEmail('')
            Alert.alert('Success', referSuccess, [
                {
                    text: 'OK',
                    onPress: () => {
                        dispatch(resetError());
                        props.navigation.goBack();
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
    }, [error, referSuccess]);


    const onEmailChange = (text) => {
        setEmail(text)
    }

    const onProfile = () => {
        props.navigation.navigate('Profile')
    }

    const onNotification = () => {

    }

    const onMenu = () => {
        props.navigation.openDrawer();
    }

    const onSubmit = () => {
        if (isEmpty(email)) {
            alert("Please enter email address.")
            return
        } else if (!isValidEmail(email)) {
            alert("Please enter valid email address.")
            return
        }

        let formData  = new FormData();
        formData.append('refer_email_id',email);

        dispatch(referFriend(formData))
    }

    return (
        <BaseContainer
            {...props}
            // left={Assets.MENU}
            // onLeft={onMenu}
            // right={[Assets.PROFILE, Assets.NOTIFICATION]}
            // onRight={[onProfile, onNotification]}
            title={"Refer a Friend"}
        >
            {loading ? <Loader /> : null}
            <View style={{ flex: 1, paddingHorizontal: 20, backgroundColor: colors.SCREEN_BACKGROUND }}>
                <Text style={{ fontFamily: fonts.REGULAR, fontSize: 20, fontWeight: '500', marginTop: 50 }}>{`When you refer a friend, you will get next month free when your friend joined.`}
                </Text>


                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={Assets.REFER_COVER} style={{ position: 'absolute', right: -20 }} />
                    <View style={{
                        width: '100%', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, paddingVertical: 10,
                        backgroundColor: colors.white, borderRadius: 30, borderColor: colors.light_gray_text, borderWidth: 2
                    }}>
                        <TextInput
                            placeholder={'ENTER EMAIL ADDRESS'}
                            style={{ flex: 1, fontFamily: fonts.REGULAR, fontSize: 12, color: colors.black,textTransform:'lowercase',margin:0,padding:0 }}
                            value={email}
                            onChangeText={onEmailChange}
                            keyboardType={'email-address'}
                            autoCapitalize='none'
                        />
                        <Text onPress={onSubmit} style={{ fontFamily: fonts.REGULAR, color: colors.black, fontWeight: '500', fontSize: 16, marginRight: 15 }}>{"INVITE"}</Text>
                        <TouchableOpacity onPress={onSubmit}>
                            <Image source={Assets.ARROW} />
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        </BaseContainer>
    )
}


export default ReferFriend
