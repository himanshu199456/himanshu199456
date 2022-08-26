import React, { FC } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Assets } from '../assets';
import colors from '../utils/colors';
import { fonts } from '../utils/fonts';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MTHeader from './MTHeader';

const BaseContainer = (props) => {

    const onProfile = () => {
        if (!props.isHideIcon)
            props.navigation.navigate('AccountSetting')
    }

    const onNotification = () => {
        if (!props.isHideIcon)
            props.navigation.navigate('NotificationList')
    }

    const onMenu = () => {
        console.log(" props ",props);
        if (!props.isHideIcon)
            props.navigation.openDrawer();
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
            <MTHeader
                // left={props.left}
                // onLeft={props.onLeft}
                // right={props.right}
                // onRight={props.onRight}
                left={props.isHideIcon ? null : Assets.MENU}
                onLeft={onMenu}
                right={props.isHideIcon ? null : [Assets.PROFILE, Assets.NOTIFICATION]}
                onRight={[onProfile, onNotification]}
                title={props.title}
            />
            <View style={{ flex: 1 }}>
                {props.children}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flexDirection: 'row', paddingVertical: 10, alignItems: 'center' },
    title: { fontFamily: fonts.REGULAR, fontSize: 20, fontWeight: '500', textAlign: 'center' },
    rightContainer: { flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }
})
export default BaseContainer;
