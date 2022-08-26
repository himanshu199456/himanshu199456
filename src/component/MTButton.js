import React, { FC } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Assets } from '../assets';
import colors from '../utils/colors';
import { fonts } from '../utils/fonts';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const MTButton = (props) => {
    return (
        <TouchableOpacity style={[styles.container,props.style]} onPress={props.onClick}>
            <Text style={[styles.title,props.titleStyle]}>{props.title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: { marginHorizontal: 30, marginTop: 30, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 10, backgroundColor: colors.blue, borderRadius: 4 },
    title: { fontFamily: fonts.REGULAR, fontSize: 22, color: colors.white, marginHorizontal: 20 }

})
export default MTButton;
