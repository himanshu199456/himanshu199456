
import AsyncStorage from '@react-native-community/async-storage';
import { useIsFocused } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Image, Platform, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
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
import RNFetchBlob from 'rn-fetch-blob'

const TrackList = (props) => {

    const [user, setUser] = useState(null)
    const [isNext, setIsNext] = useState(false)
    const [audioList, setAudios] = useState([])
    const [isPlay, setIsPlay] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(null)

    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    useEffect(async () => {
        let onPlayingFinish = null
        if (isFocused) {
            getAudioList()
            // onPlayingFinish = SoundPlayer.onFinishedPlaying((data) => {
            //     console.log(" CHECK DATA ", data);
            //     setIsPlay(false)
            //     setCurrentIndex(null)
            //     SoundPlayer.stop()
            // })
        } else {
            // if (onPlayingFinish != null)
            //     onPlayingFinish.remove()
        }



        return (() => {
            // onPlayingFinish.remove()
        })
    }, [isFocused])

    useEffect(() => {

    }, [audioList])

    const getAudioList = async () => {
        console.log(" PROPS 22", props);
        let audioList = await AsyncStorage.getItem('audios');
        audioList = JSON.parse(audioList);
        console.log(" USER DATA 5555", audioList);
        if (audioList != null) {
            setAudios([...audioList.audios])
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
    const onPlay = async (file, index) => {
        let fileExists = await RNFetchBlob.fs.exists(Platform.OS == 'ios' ? String(file.uri).replace('file://', '') : file.uri)
        console.log(' fileExists ', fileExists);

        if (fileExists) {
            onPlayingFinish = SoundPlayer.onFinishedPlaying((data) => {
                console.log(" CHECK DATA ", data);
                setIsPlay(false)
                setCurrentIndex(null)
                SoundPlayer.stop()
            })
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
        } else {
            let newList = audioList;
            newList.splice(index, 1)

            let storeData = {
                audios: newList
            }

            await AsyncStorage.setItem('audios', JSON.stringify(storeData));
            getAudioList()
        }

    }

    const onStopPlay = (file, index) => {
        setIsPlay(false)
        setCurrentIndex(null)
        if (onPlayingFinish != null)
            onPlayingFinish.remove()
        try {
            // play the file tone.mp3
            // SoundPlayer.playSoundFile('tone', 'mp3')
            // or play from url
            SoundPlayer.stop()
        } catch (e) {
            console.log(`cannot play the sound file`, e)
        }

    }

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
                        audios: newList
                    }

                    await AsyncStorage.setItem('audios', JSON.stringify(storeData));
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
                    console.log(" isPlay && currentIndex ", isPlay && currentIndex);
                    console.log(" isPlay && currentIndex ", isPlay);
                    console.log(" isPlay && currentIndex ", currentIndex);
                    if (isPlay && currentIndex == index) {
                        onStopPlay(item, index);
                    } else {
                        if (!isPlay) {
                            onPlay(item, index)
                        }
                    }
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
                    <Text style={{ fontFamily: fonts.REGULAR, color: colors.black, fontSize: 21 }}>{item.name || ""}</Text>
                    <Text>{`duration: ${item.progress} size : ${item.size || 0}kb`}</Text>
                </View>

                <TouchableOpacity style={{ flex: 0.8 }} onPress={() => onDeleteClick(item, index)}>
                    <Image source={Assets.DELETE} style={{ width: 22, height: 22 }} resizeMode={'contain'} />
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <BaseContainer
            {...props}
            left={Assets.MENU}
            onLeft={onMenu}
            right={[Assets.PROFILE, Assets.NOTIFICATION]}
            onRight={[onProfile, onNotification]}
            title={"Audio Screen List"}>
            <View style={{ flex: 1, backgroundColor: colors.white, padding: 20 }}>

                <Text style={{ marginLeft: 10, marginTop: 30, fontFamily: fonts.REGULAR, color: colors.black, fontSize: 24 }}>{"Your saved recording"}</Text>

                {audioList != null && audioList.length > 0 ?
                    <FlatList
                        style={{ marginTop: 20 }}
                        data={audioList}
                        renderItem={renderItem}
                        showsVerticalScrollIndicator={false}
                    /> :
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontFamily: fonts.REGULAR }}>{"No Audios found"}</Text>
                    </View>
                }
            </View>
        </BaseContainer>
    )
}

export default TrackList
