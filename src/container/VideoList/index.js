
import AsyncStorage from '@react-native-community/async-storage';
import { useIsFocused } from '@react-navigation/core';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Dimensions, FlatList, Image, Platform, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch } from 'react-redux';
import { Assets } from '../../assets';
import BaseContainer from '../../component/BaseContainer';
import HomeOption from '../../component/HomeOption';
import MTHeader from '../../component/MTHeader';
import colors from '../../utils/colors';
import { fonts } from '../../utils/fonts';
import { logoutAction } from '../Login/actions';
import SoundPlayer from 'react-native-sound-player'
import RNFetchBlob from 'rn-fetch-blob';
import Video from 'react-native-video';

const VideoList = (props) => {

    const [user, setUser] = useState(null)
    const [isNext, setIsNext] = useState(false)
    const [audioList, setAudios] = useState(false)
    const [isPlay, setIsPlay] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(null)
    const [videoUrl, setVideoUrl] = useState(null)
    const videoRef = useRef()

    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    useEffect(async () => {
        if (isFocused) {
            getAudioList()
        }
    }, [isFocused])


    const getAudioList = async () => {
        console.log(" PROPS 22", props);
        let audioList = await AsyncStorage.getItem('videos');
        audioList = JSON.parse(audioList);
        console.log(" USER DATA 5555", audioList);
        if (audioList != null) {
            setAudios([...audioList.videos])
        }
    }

    // useEffect(async () => {
    //     console.log(" PROPS 22", props);
    //     let userData = await AsyncStorage.getItem('token');
    //     console.log(" USER DATA 111", userData);
    //     userData = JSON.parse(userData);
    //     console.log(" USER DATA ", userData);
    //     setUser(userData)
    // }, [])

    const onProfile = () => {

    }

    const onNotification = () => {

    }

    const onMenu = () => {
        props.navigation.openDrawer();
    }
    const onPlay = (file, index) => {
        setIsPlay(!isPlay)
        setCurrentIndex(index)
        try {
            // play the file tone.mp3
            // SoundPlayer.playSoundFile('tone', 'mp3')
            // or play from url
            SoundPlayer.playUrl(file.uri)
        } catch (e) {
            console.log(`cannot play the sound file`, e)
        }
    }

    const onStopPlay = (file, index) => {
        setIsPlay(false)
        setCurrentIndex(null)
        try {
            // play the file tone.mp3
            // SoundPlayer.playSoundFile('tone', 'mp3')
            // or play from url
            SoundPlayer.stop()
        } catch (e) {
            console.log(`cannot play the sound file`, e)
        }
    }

    useEffect(() => {

    }, [audioList])

    useEffect(() => {
        if (videoUrl != null) {
            videoRef.current?.presentFullscreenPlayer()
            videoRef.current?.seek(0)
        }
    }, [videoUrl])

    const onDeleteClick = async (item, index) => {
        Alert.alert('Alert', 'Are you sure you want to delete this audio?', [
            {
                text: 'OK',
                onPress: async () => {
                    console.log("item.uri", item.uri);
                    let isExists = await RNFetchBlob.fs.exists(Platform.OS == 'ios' ? String(item.uri).replace('file://', '') : item.uri)
                    // console.log(' check exists ',await RNFetchBlob.fs.exists(Platform.OS == 'ios' ? String(item.uri).replace('file://', '') : item.uri)); 
                    console.log(" isExists ", isExists);
                    if (isExists) {
                        await RNFetchBlob.fs.unlink(Platform.OS == 'ios' ? String(item.uri).replace('file://', '') : item.uri)
                    }

                    let newList = audioList;
                    newList.splice(index, 1)

                    let storeData = {
                        videos: newList
                    }

                    await AsyncStorage.setItem('videos', JSON.stringify(storeData));
                    getAudioList()

                    // RNFS.exists(filepath)
                    //     .then((result) => {
                    //         console.log("file exists: ", result);

                    //         if (result) {
                    //             return RNFS.unlink(filepath)
                    //                 .then(() => {
                    //                     console.log('FILE DELETED');
                    //                 })
                    //                 // `unlink` will throw an error, if the item to unlink does not exist
                    //                 .catch((err) => {
                    //                     console.log(err.message);
                    //                 });
                    //         }

                    //     })
                    //     .catch((err) => {
                    //         console.log(err.message);
                    //     });
                },
            },
            {
                text: 'Cancel'
            },
        ]);
    }

    const renderItem = ({ item, index }) => {
        console.log(" ITEM ", item);
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, borderRadius: 10, backgroundColor: colors.white, borderBottomWidth: 1, padding: 10, paddingBottom: 20 }}>
                <TouchableOpacity style={{ flex: 0.5 }} onPress={() => {
                    if(Platform.OS == 'android'){
                        props.navigation.navigate('VideoShow', { uri: item.uri, isVideoList: true })
                    }else{
                        setVideoUrl(item.uri)
                    }

                    // setTimeout(() => {
                    //     videoRef.current?.presentFullscreenPlayer()
                    //     videoRef.current?.seek(0)
                    // }, 1000);
                }}
                    style={{
                        width: 55, height: 55, justifyContent: 'center', alignItems: 'center', shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.8,
                        shadowRadius: 2,
                        elevation: 5,
                        backgroundColor: colors.white,
                        borderRadius: 110
                    }}>
                    <Image source={isPlay && currentIndex == index ? Assets.PAUSE : Assets.PLAY_AUDIO} style={{ width: 30, height: 30 }} />
                </TouchableOpacity>

                <View style={{ marginHorizontal: 10, flex: 10 }}>
                    <Text style={{ fontFamily: fonts.REGULAR, color: colors.black, fontSize: 21 }}>{item.name || "PDJDAudioRecord.mp3"}</Text>
                    <Text>{`duration: ${convertHMS(item.progress)} size : ${item.size || 5}kb`}</Text>
                </View>

                <TouchableOpacity style={{ flex: 1 }} onPress={() => onDeleteClick(item, index)}>
                    <Image source={Assets.DELETE} style={{ width: 25, height: 25 }} resizeMode={'contain'} />
                </TouchableOpacity>
            </View>
        )
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

    return (
        <BaseContainer
            {...props}
            left={Assets.MENU}
            onLeft={onMenu}
            right={[Assets.PROFILE, Assets.NOTIFICATION]}
            onRight={[onProfile, onNotification]}
            title={"Video Screen List"}>
            <View style={{ flex: 1, backgroundColor: colors.white, padding: 20 }}>

                <Text style={{ marginLeft: 10, marginTop: 30, fontFamily: fonts.REGULAR, color: colors.black, fontSize: 24 }}>{"Your saved video recording"}</Text>

                {audioList != null ?
                    <FlatList
                        style={{ marginTop: 20 }}
                        data={audioList}
                        renderItem={renderItem}
                        showsVerticalScrollIndicator={false}
                    /> : null}


                {console.log('video url', videoUrl)}
                {videoUrl != null ?
                    <Video source={{ uri: Platform.OS == 'ios' ? String(videoUrl).replace(' file://', '') : String(videoUrl) }}   // Can be a URL or a local file.
                        ref={videoRef}
                        style={{
                            width: Dimensions.get('window').height,
                            height: Dimensions.get('window').width,
                            minWidth: Dimensions.get('window').height,
                            minHeight: Dimensions.get('window').width,
                            borderWidth: 0, padding: 20, justifyContent: 'center', alignItems: 'center'
                        }}
                        onFullscreenPlayerWillDismiss={() => setVideoUrl(null)}
                    // Store reference
                    /> : null}
            </View>
        </BaseContainer>
    )
}

export default VideoList
