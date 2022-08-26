
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
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import RNFetchBlob from 'rn-fetch-blob'
import AsyncStorage from '@react-native-community/async-storage';
import { RNCamera } from 'react-native-camera';

const VideoRecord = (props) => {

    const videoRef = useRef()
    const [isRecording, setIsRecording] = useState(false)
    const [progress, setProgress] = useState(0)
    const [time, setTime] = useState(0)
    let count = 0
    const timer = useRef(null);
    const audioRecorderPlayer = new AudioRecorderPlayer();
    const dispatch = useDispatch();

    useEffect(() => {

    }, [progress])

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
        console.log(" isRecording ", isRecording);
        if (isRecording) {
            setIsRecording(false)
            // onStopRecord()

            videoRef.current.stopRecording();
            // stopTimer();
        } else {
            setIsRecording(true)
            // setTimeout(() => {
            //     startTimer()
            // }, 1000);
            // onStartRecord()
            const { uri } = await videoRef.current.recordAsync({ fps: 30, quality: RNCamera.Constants.VideoQuality["720p"], maxDuration: 60000 });
            if (uri) {
                props.navigation.navigate('VideoPlayer', { uri, isVideoList: false })
            }
            console.log(" URI ", uri);
        }
    }

    const stroreAudio = async (fileUri) => {
        let prevAudios = await AsyncStorage.getItem('Videos');
        prevAudios = JSON.parse(prevAudios);
        if (prevAudios != null) {
            prevAudios = prevAudios.audios
        } else {
            prevAudios = []
        }
        console.log(" USER DATA 111", prevAudios);

        let audioFile = {
            uri: fileUri,
            progress: progress,
            name: `Audio_${Date.now()}`
        }

        prevAudios[prevAudios.length] = audioFile;
        console.log(" prevAudios ", prevAudios);

        let storeData = {
            audios: prevAudios
        }

        await AsyncStorage.setItem('audios', JSON.stringify(storeData));
        Alert.alert('Audio', 'Audio Saved', [
            {
                text: 'OK',
                onPress: () => {
                    props.navigation.navigate('TrackList')
                },
            },
        ]);
    }

    const startTimer = () => {
        timer.current = setInterval(() => {
            let totalTime = count + 1
            console.log("time ", count);
            // setTime(totalTime)
            setProgress(convertHMS(totalTime))
        }, 1000);
    }

    const stopTimer = () => {
        // if (timer) clearInterval(timer);
        clearInterval(timer.current);
        timer.current = null;
    }

    function convertHMS(value) {
        const sec = parseInt(value, 10); // convert value to number if it's string
        let hours = Math.floor(sec / 3600); // get hours
        let minutes = Math.floor((sec - (hours * 3600)) / 60); // get minutes
        let seconds = sec - (hours * 3600) - (minutes * 60); //  get seconds
        // add 0 if value < 10; Example: 2 => 02
        if (hours < 10) { hours = "0" + hours; }
        if (minutes < 10) { minutes = "0" + minutes; }
        if (seconds < 10) { seconds = "0" + seconds; }
        return hours + ':' + minutes + ':' + seconds; // Return is HH : MM : SS
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
            title={"Recording Screen"}
        >
            <View style={{ flex: 1, backgroundColor: colors.white }}>
                {console.log(" TIME ", time)}

                <RNCamera
                    ref={videoRef}
                    style={{ flex: 1,width:'100%' }}
                    type={RNCamera.Constants.Type.back}
                    flashMode={RNCamera.Constants.FlashMode.on}
                    onRecordingStart={data => {
                        console.log(" DATA ", data);
                    }}
                    onRecordingEnd={value => {
                        console.log(" VALUE ", value);
                    }}
                // permissionDialogTitle={"Permission to use camera"}
                // permissionDialogMessage={
                //     "We need your permission to use your camera phone"
                // }
                />

                {/* <View style={{ justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 30, left: '40%',zIndex:999 }}>
                    {
                        <TouchableOpacity onPress={onRecord}>
                            <Image source={isRecording ? Assets.RECORD_PAUSE : Assets.RECORD_VIDEO} style={{ width: 80, height: 80 }} resizeMode={'contain'} />
                        </TouchableOpacity>
                    }
                </View> */}
                {/* <Text style={{ marginHorizontal: 50, marginVertical: 20, fontFamily: fonts.REGULAR, color: colors.blue, fontSize: 38, alignSelf: 'center', fontWeight: '500' }}>{progress != 0 ? progress : '0: 00: 00'}</Text> */}
                <Text style={{ marginHorizontal: 50, marginVertical: 10, fontFamily: fonts.REGULAR, color: colors.blue, fontSize: 20, alignSelf: 'center', fontWeight: '400' }}>{'Tap Record'}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 40,paddingBottom:20 }}>

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
                        <Image source={isRecording ? Assets.PAUSE : Assets.PLAY_AUDIO} />
                    </TouchableOpacity>

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

                </View>
            </View>
        </BaseContainer>
    )
}


export default VideoRecord
