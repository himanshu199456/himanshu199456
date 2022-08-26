import React, { FC } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Assets } from '../assets';
import colors from '../utils/colors';
import { fonts } from '../utils/fonts';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const SocialMediaButton = (props) => {
    return (
        <TouchableOpacity style={[{ borderColor: props.borderColor, borderWidth: 1, borderRadius: 4 }]} onPress={props.onPress}>
            <View style={styles.container}>
                <Image source={props.icon} />
                <Text style={[styles.text, { color: props.borderColor }]}>{props.title}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: { flexDirection: 'row', alignItems: 'center', padding: 8, },
    text: { marginHorizontal: 10, fontSize: 12, fontFamily: fonts.REGULAR, }
})
export default SocialMediaButton;
