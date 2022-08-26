
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Alert, Dimensions, FlatList, Image, ImageBackground, KeyboardAvoidingView, Platform, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSelector, useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import { Assets } from '../../assets';
import BaseContainer from '../../component/BaseContainer';
import colors from '../../utils/colors';
import { fonts } from '../../utils/fonts';
import RNFetchBlob from 'rn-fetch-blob'
import AsyncStorage from '@react-native-community/async-storage';
import { RNCamera } from 'react-native-camera';
import Video from 'react-native-video';
import { DEVICE } from '../../utils/constant';
import { useIsFocused } from '@react-navigation/native';

const VideoShow = (props) => {

    const videoRef = useRef()
    const [isRecording, setIsRecording] = useState(false)
    const [isPause, setIsPause] = useState(true)
    const [duration, setDuration] = useState(true)


    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    useEffect(async () => {
        console.log(" PROPS ", props);
        if (isFocused) {
            videoRef.current?.presentFullscreenPlayer()
            videoRef.current?.seek(0)
        }else{
            videoRef.current?.dismissFullscreenPlayer()
        }
    }, [isFocused])

    const onProfile = () => {
        props.navigation.navigate('Profile')
    }

    const onNotification = () => {

    }

    const onMenu = () => {
        props.navigation.openDrawer();
    }

    const onList = () => {
        props.navigation.navigate('VideoList')
    }

    const onRecord = async () => {
        // if(!isPause){
        videoRef.current?.presentFullscreenPlayer()
        videoRef.current?.seek(0)
        // }

        setIsPause(!isPause)
    }

    const onSave = () => {
        stroreAudio()
    }

    const stroreAudio = async () => {
        let fileDetail = await RNFetchBlob.fs.stat(Platform.OS == 'ios' ? String(props.route.params.uri).replace('file://', '') : props.route.params.uri);
        console.log(" fileDetail ", fileDetail);
        let prevVideos = await AsyncStorage.getItem('videos');
        prevVideos = JSON.parse(prevVideos);
        if (prevVideos != null) {
            prevVideos = prevVideos.videos
        } else {
            prevVideos = []
        }
        console.log(" USER DATA 111", prevVideos);

        let audioFile = {
            uri: props.route.params.uri,
            progress: duration,
            name: `Video_${Date.now()}`,
            size: parseInt(fileDetail.size / 1000)
        }

        prevVideos[prevVideos.length] = audioFile;
        console.log(" prevVideos ", prevVideos);

        let storeData = {
            videos: prevVideos
        }

        await AsyncStorage.setItem('videos', JSON.stringify(storeData));
        Alert.alert('Video', 'Video Saved', [
            {
                text: 'OK',
                onPress: () => {
                    props.navigation.navigate('VideoList')
                },
            },
        ]);
    }

    const onBack = () => {
        props.navigation.goBack();
    }
    return (
        <BaseContainer
            {...props}
            left={Assets.MENU}
            onLeft={onMenu}
            right={[Assets.PROFILE, Assets.NOTIFICATION]}
            onRight={[onProfile, onNotification]}
            title={"Video"}
        >
            <View style={{ flex: 1, backgroundColor: colors.white }}>
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 1, paddingTop: 30, backgroundColor: colors.black }}>
                        <Video
                            source={{ uri: Platform.OS == 'ios' ? String(props.route.params.uri).replace(' file://', '') : String(props.route.params.uri) }}
                            ref={videoRef}
                            style={{ width: (DEVICE.DEVICE_WIDTH - 5), height: '90%', borderWidth: 0, padding: 20, justifyContent: 'center', alignItems: 'center' }}
                            onLoad={(data) => {
                                console.log(" DATA ", data);
                                setDuration(data.duration)
                            }}
                            repeat={false}
                            onEnd={() => {
                                console.log(' ===================== ON END CALLED ===================== ');
                                setIsPause(true)
                            }}
                            controls={true}
                        // fullscreenOrientation={'all'}
                        />
                    </View>
                </View>
            </View>
        </BaseContainer>
    )
}


export default VideoShow
