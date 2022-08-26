
import React, { useEffect, useRef, useState } from 'react';
import { Alert, FlatList, Image, ImageBackground, KeyboardAvoidingView, Platform, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSelector, useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import { Assets } from '../../assets';
import BaseContainer from '../../component/BaseContainer';
import Loader from '../../component/Loader';
import MTButton from '../../component/MTButton';
import colors from '../../utils/colors';
import { fonts } from '../../utils/fonts';
import styles from './styles';

const RecordingScreen = (props) => {

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

    const onVoice = () => {
        props.navigation.navigate('RecordPlayer')
    }

    const onVideo = () => {
        props.navigation.navigate('VideoRecord')
    }

    return (
        <BaseContainer
        {...props}
            left={Assets.MENU}
            onLeft={onMenu}
            right={[Assets.PROFILE, Assets.NOTIFICATION]}
            onRight={[onProfile, onNotification]}
            title={"Recording Screen"}
        >
            <View style={{ flex: 1 }}>
                <View style={{ marginVertical: 90 }}>
                    <View>
                        <Image source={Assets.VOICE_RECORDING} style={{ width: 100, height: 100, alignSelf: 'center' }} resizeMode={'contain'} />
                        <MTButton title={'Voice recording'} style={{ marginBottom: 30 }} onClick={onVoice} />
                    </View>
                    <View style={{ marginTop: 60 }}>
                        <Image source={Assets.VIDEO_RECORDING} style={{ width: 100, height: 100, alignSelf: 'center' }} resizeMode={'contain'} />
                        <MTButton title={'Video recording'} style={{ marginBottom: 30 }} onClick={onVideo} />
                    </View>
                </View>
            </View>
        </BaseContainer>
    )
}


export default RecordingScreen
