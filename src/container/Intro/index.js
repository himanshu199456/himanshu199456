
import AsyncStorage from '@react-native-community/async-storage';
import React, { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Assets } from '../../assets';
import colors from '../../utils/colors';

const Intro = (props) => {

    const [isShowRed, setIsShowRed] = useState(true)

    useEffect(async () => {
        console.log(" PROPS 11", props);
        let userData = await AsyncStorage.getItem('token');
        userData = JSON.parse(userData);

        setTimeout(() => {
            console.log(" CHECK TIME OUT CALLED...");
            props.navigation.reset({
                routes: [{ name: 'Splash' }]
            })
            // console.log(" SET TIME OUT ",userData);
            // if (userData != null) {
            //     props.navigation.reset({
            //         routes: [{ name: 'Home' }]
            //     })
            // } else {
            //     props.navigation.reset({
            //         routes: [{ name: 'Login' }]
            //     })
            // }
        }, 3000);

    },[])

    useEffect(() => {
        const id = setInterval(() => {
            setIsShowRed(!isShowRed)
        }, 500);

        return () => {
            clearInterval(id);
        };
    })



    return (
        <View style={{ flex: 1, backgroundColor: colors.blue, justifyContent: 'center', alignItems: 'center' }}>
            {/* <Image source={Assets.INTRO_ANIMATION} style={{ width: 200, height: 200 }} resizeMode={'contain'} /> */}
            <Image source={isShowRed ? Assets.INTRO_RED : Assets.INTRO_GREEN} style={{ width: 200, height: 200 }} resizeMode={'contain'} />
        </View>
    )
}

export default Intro
