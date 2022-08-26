import React, { FC } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Assets } from '../assets';
import colors from '../utils/colors';
import { fonts } from '../utils/fonts';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const HomeOption = (props) => {
    return (
        <TouchableOpacity style={[styles.container,{ backgroundColor: props.backgroundColor }]} onPress={props.onPress}>
            <Image source={props.icon} />
            <Text style={styles.text}>{props.title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: { marginTop: 20, marginHorizontal: 10, flexDirection: 'row', alignItems: 'center', padding: 22, backgroundColor: colors.red, borderRadius: 15 },
    text: { fontFamily: fonts.REGULAR, fontSize: 18, fontWeight: '500', color: colors.white, marginLeft: 20 }
})
export default HomeOption;
