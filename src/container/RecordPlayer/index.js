
import React, { useEffect, useRef, useState } from 'react';
import { Alert, FlatList, Image, ImageBackground, PermissionsAndroid, KeyboardAvoidingView, Platform, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
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

const RecordPlayer = (props) => {

    const [isRecording, setIsRecording] = useState(false)
    const [progress, setProgress] = useState('')
    // const [progressToStore, setProgressToStore] = useState(null)
    let progressToStore = '';
    const audioRecorderPlayer = new AudioRecorderPlayer();

    const dispatch = useDispatch();

    useEffect(()=>{
        checkPermission()
    },[])

    useEffect(() => {

    }, [progressToStore])

    const onProfile = () => {
        props.navigation.navigate('Profile')
    }

    const onNotification = () => {

    }

    const onMenu = () => {
        props.navigation.openDrawer();
    }

    const onVoice = () => {
        // props.navigation.navigate('SupportTicket')
    }

    const onVideo = () => {
        // props.navigation.navigate('SupportTicket')
    }
    const onList = () => {
        props.navigation.navigate('TrackList')
    }

    const checkPermission =async () => {
        if (Platform.OS === 'android') {
            try {
                const grants = await PermissionsAndroid.requestMultiple([
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                    PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                ]);
                console.log('write external stroage', grants);
                if (
                    grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
                    PermissionsAndroid.RESULTS.GRANTED &&
                    grants['android.permission.READ_EXTERNAL_STORAGE'] ===
                    PermissionsAndroid.RESULTS.GRANTED &&
                    grants['android.permission.RECORD_AUDIO'] ===
                    PermissionsAndroid.RESULTS.GRANTED
                ) {
                    console.log('Permissions granted');
                } else {
                    console.log('All required permissions not granted');
                    return;
                }
            } catch (err) {
                console.log(" CHECK FOR THE ERROR ",err);
                return;
            }
        }
    }

    const onStartRecord = React.useCallback(async () => {
        const dirs = RNFetchBlob.fs.dirs;
        console.log(" dirs ", dirs);
        const path = Platform.select({
            ios: `file://${dirs.CacheDir}/${Date.now()}.m4a`,
            android: `${dirs.CacheDir}/${Date.now()}.mp3`,
        });
        console.log(" path ", path);

        const uri = await audioRecorderPlayer.startRecorder(path);
        audioRecorderPlayer.addRecordBackListener((e) => {
            console.log('record-back', e);
            console.log(" check data 11", e.currentPosition);
            console.log(" CHECK LOG TIME ", millisToMinutesAndSeconds(e.currentPosition));
            setProgress(millisToMinutesAndSeconds(e.currentPosition))
            // setProgressToStore(millisToMinutesAndSeconds(e.currentPosition))
            progressToStore = millisToMinutesAndSeconds(e.currentPosition)
            // console.log(" check data 22", audioRecorderPlayer.mmss(Math.floor(e.currentPosition)));
            // setrecordSecs(e.currentPosition);
            // setrecordTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)));
        });
    }, []);

    const onStopRecord = React.useCallback(async () => {
        const result = await audioRecorderPlayer.stopRecorder();
        audioRecorderPlayer.removeRecordBackListener();
        // setrecordSecs(0);
        console.log(" file path ", result);
        console.log(" progress ", progressToStore);
        setProgress('')
        stroreAudio(result)
    }, []);

    const stroreAudio = async (fileUri) => {
        let fileDetail = await RNFetchBlob.fs.stat(Platform.OS == 'ios' ? String(fileUri).replace('file://', '') : fileUri);
        console.log(" fileDetail ", fileDetail);
        let prevAudios = await AsyncStorage.getItem('audios');
        prevAudios = JSON.parse(prevAudios);
        console.log(" prevAudios ", prevAudios);
        if (prevAudios != null) {
            prevAudios = prevAudios.audios
        } else {
            prevAudios = []
        }
        console.log(" USER DATA 111", prevAudios);

        let audioFile = {
            uri: fileUri,
            progress: progressToStore,
            name: `Audio_${Date.now()}`,
            size: parseInt(fileDetail.size / 1000)
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

    const onRecord = async () => {
        console.log(" isRecording ", isRecording);
        if (isRecording) {
            setIsRecording(false)
            onStopRecord()

        } else {
            setIsRecording(true)
            onStartRecord()
        }

    }

    function millisToMinutesAndSeconds(millis) {
        var d = new Date(1000 * Math.round(millis / 1000)); // round to nearest second
        function pad(i) { return ('0' + i).slice(-2); }
        var str = d.getUTCHours() + ':' + pad(d.getUTCMinutes()) + ':' + pad(d.getUTCSeconds());
        console.log(str); // 0:04:59
        return str
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
            title={"Audio Recording Screen"}
        >
            <View style={{ flex: 1, backgroundColor: colors.white }}>
                <View style={{ marginVertical: 90 }}>
                    <View>
                        <Image source={Assets.VOICE_RECORDING} style={{ alignSelf: 'center' }} resizeMode={'contain'} />
                        <Text style={{ marginHorizontal: 50, marginVertical: 20, fontFamily: fonts.REGULAR, color: colors.blue, fontSize: 38, alignSelf: 'center', fontWeight: '500' }}>{progress != '' ? progress : '0: 00: 00'}</Text>
                    </View>

                    <View style={{ marginHorizontal: 40, marginVertical: 20, height: 10, borderWidth: 1, borderColor: colors.SEEK_BACKGROUND, borderRadius: 10 }} />
                    <Text style={{ marginHorizontal: 50, marginVertical: 10, fontFamily: fonts.REGULAR, color: colors.blue, fontSize: 20, alignSelf: 'center', fontWeight: '400' }}>{'Tap Record'}</Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 40 }}>

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
                            <Image source={isRecording ? Assets.PAUSE : Assets.PLAY_AUDIO} style={{ marginLeft: 5 }} />
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
                    {/* <Text style={{ marginHorizontal: 50, fontFamily: fonts.REGULAR, color: colors.black, fontSize: 16, fontWeight: '500', marginTop: 50 }}>{'Note : '}
                        <Text style={{ marginHorizontal: 50, fontFamily: fonts.REGULAR, color: colors.text_black, fontSize: 16 }}>{'About 1 week time'}

                        </Text>
                    </Text> */}
                </View>
            </View>
        </BaseContainer>
    )
}


export default RecordPlayer
