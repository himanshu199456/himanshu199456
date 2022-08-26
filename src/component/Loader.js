import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import colors from '../utils/colors';
import { DEVICE } from '../utils/constant';

const Loader = ({ route, navigation }) => {

    return (
        <View style={style.container}>
            <View style={style.containerOpac}></View>
            <ActivityIndicator size="large" style={style.spinner} color={colors.sky} />
        </View>
    )
};

const style = StyleSheet.create({
    container: {
        position: 'absolute',
        paddingVertical: 50,
        width: DEVICE.DEVICE_WIDTH,
        height: DEVICE.DEVICE_HEIGHT,
        zIndex: 997
    },
    containerOpac: {
        position: 'absolute',
        width: DEVICE.DEVICE_WIDTH,
        height: DEVICE.DEVICE_HEIGHT,
        backgroundColor: colors.shadow,
        zIndex: 998
    },
    spinner: {
        flex: 1,
        alignSelf: 'center',
        zIndex: 999
    }
})

export default Loader;
