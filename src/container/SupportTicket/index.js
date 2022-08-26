
import React, { useEffect, useRef, useState } from 'react';
import { Alert, FlatList, Image, ImageBackground, KeyboardAvoidingView, Platform, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSelector, useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import { Assets } from '../../assets';
import BaseContainer from '../../component/BaseContainer';
import Loader from '../../component/Loader';
import colors from '../../utils/colors';
import { fonts } from '../../utils/fonts';
import styles from './styles';

const SupportTicket = (props) => {

    const [address, setAddress] = useState('')

    const dispatch = useDispatch();

    const onProfile = () => {
        props.navigation.navigate('Profile')
    }

    const onNotification = () => {

    }

    const onMenu = () => {
        props.navigation.openDrawer();
    }

    return (
        <BaseContainer
        {...props}
            left={Assets.MENU}
            onLeft={onMenu}
            right={[Assets.PROFILE, Assets.NOTIFICATION]}
            onRight={[onProfile, onNotification]}
            title={"Support Ticket"}
        >
            <View style={{ flex: 1, paddingHorizontal: 20 }}>
                <View style={{ alignItems: 'center', justifyContent: 'center', marginVertical: 100 }}>
                    <Image source={Assets.DONE} />

                    <Text style={{ fontFamily: fonts.REGULAR, fontSize: 26, textAlign: 'center', marginTop: 20 }}>{`Thank you for
 submited your ticket`}</Text>

                    <Text style={{ fontFamily: fonts.REGULAR, fontSize: 16, textAlign: 'center', marginTop: 20, color: colors.text_gray }}>{`Your ticket has been  submitted for
 thank you .`}</Text>

                    <Text style={{ fontFamily: fonts.REGULAR, fontSize: 16, textAlign: 'center', marginTop: 20, color: colors.text_gray }}>{`You want to raise a customer support
 request click Here `}</Text>

                </View>
            </View>
        </BaseContainer>
    )
}


export default SupportTicket
