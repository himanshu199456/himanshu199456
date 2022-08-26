
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Dimensions, FlatList, Image, ImageBackground, KeyboardAvoidingView, Platform, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
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
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import RNFetchBlob from 'rn-fetch-blob'
import AsyncStorage from '@react-native-community/async-storage';
import { RNCamera } from 'react-native-camera';
import Video from 'react-native-video';
import { DEVICE } from '../../utils/constant';

const VideoPlayer = (props) => {

    const videoRef = useRef()
    const [isRecording, setIsRecording] = useState(false)
    const [isPause, setIsPause] = useState(true)
    const [duration, setDuration] = useState(true)


    const dispatch = useDispatch();
    useEffect(async () => {
        console.log(" PROPS ", props);
    }, [])

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
        setIsPause(true)
        props.navigation.goBack();
    }
    return (
        <BaseContainer
            {...props}
            left={Assets.MENU}
            onLeft={onMenu}
            right={[Assets.PROFILE, Assets.NOTIFICATION]}
            onRight={[onProfile, onNotification]}
            title={"Video Player"}
        >
            <View style={{ flex: 1, backgroundColor: colors.white }}>
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 1, paddingTop: 30, backgroundColor: colors.black }}>
                        <Video source={{ uri: Platform.OS == 'ios' ? String(props.route.params.uri).replace(' file://', '') : String(props.route.params.uri) }}   // Can be a URL or a local file.
                            ref={videoRef}
                            style={{
                                // width: (DEVICE.DEVICE_WIDTH - 5), 
                                // height: '90%',
                                // width: (DEVICE.DEVICE_WIDTH),
                                // minWidth: (DEVICE.DEVICE_WIDTH),
                                flex: 1,
                                position: 'absolute',
                                top: 10,
                                left: 10,
                                bottom: 10,
                                right: 10,
                            }}
                            resizeMode={'cover'}
                            paused={isPause}
                            onLoad={(data) => {
                                console.log(" DATA ", data);
                                setDuration(data.duration)
                            }}
                            repeat={false}
                            onEnd={() => {
                                setIsPause(true)
                            }}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 30, justifyContent: 'space-between', marginHorizontal: 40, paddingBottom: 20 }}>

                        <TouchableOpacity style={{
                            justifyContent: 'center', shadowColor: '#000',
                            shadowOffset: { width: 0, height: 1 },
                            shadowOpacity: 0.8,
                            shadowRadius: 2,
                            elevation: 5,
                            backgroundColor: colors.white, padding: 10,
                            borderRadius: 120,
                            width: 60, height: 60, alignItems: 'center'
                        }} onPress={onList}>
                            <Image source={Assets.LIST} style={{ width: 30, height: 30, tintColor: colors.blue }} resizeMode={'contain'} />
                        </TouchableOpacity>


                        <TouchableOpacity style={{
                            justifyContent: 'center', shadowColor: '#000',
                            shadowOffset: { width: 0, height: 1 },
                            shadowOpacity: 0.8,
                            shadowRadius: 2,
                            elevation: 5,
                            backgroundColor: colors.white, padding: 10,
                            borderRadius: 120,
                            width: 90, height: 90,
                            alignItems: 'center'
                        }} onPress={onRecord}>
                            <Image source={!isPause ? Assets.PAUSE : Assets.PLAY_AUDIO} />
                        </TouchableOpacity>
                        {console.log("props.route.params.isVideoList", props.route.params.isVideoList)}
                        {!props.route.params.isVideoList ?
                            <TouchableOpacity style={{
                                justifyContent: 'center', shadowColor: '#000',
                                shadowOffset: { width: 0, height: 1 },
                                shadowOpacity: 0.8,
                                shadowRadius: 2,
                                elevation: 5,
                                backgroundColor: colors.white, padding: 10,
                                borderRadius: 120,
                                width: 60, height: 60, alignItems: 'center'
                            }} onPress={onSave}>
                                <Image source={Assets.SAVE} style={{ width: 30, height: 30 }} resizeMode={'contain'} />
                            </TouchableOpacity>
                            :
                            <TouchableOpacity style={{
                                justifyContent: 'center', shadowColor: '#000',
                                shadowOffset: { width: 0, height: 1 },
                                shadowOpacity: 0.8,
                                shadowRadius: 2,
                                elevation: 5,
                                backgroundColor: colors.white, padding: 10,
                                borderRadius: 120,
                                width: 60, height: 60, alignItems: 'center'
                            }} onPress={onBack}>
                                <Image source={Assets.CANCEL} style={{ width: 30, height: 30 }} resizeMode={'contain'} />
                            </TouchableOpacity>
                        }

                    </View>
                </View>
            </View>
        </BaseContainer>
    )
}


export default VideoPlayer
