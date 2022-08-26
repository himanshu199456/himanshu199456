import React, { FC } from 'react';
import { Image, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Assets } from '../assets';
import colors from '../utils/colors';
import { fonts } from '../utils/fonts';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const TextInputField = (props) => {

    return (
        <View style={[{ marginTop: 20 },props.style]}>
            <Text style={styles.title}>{props.title}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 0.5, borderColor: colors.border_color, borderRadius: 5, marginTop: 5 }}>
                <TextInput style={[styles.textInputStyle,props.inputStyle]}
                    placeholder={props.placeholder}
                    placeholderTextColor={colors.input_color}
                    onChangeText={text => props.onChangeText(text)}
                    value={props.inputValue}
                    autoCapitalize='none'
                    keyboardType={props.keyboardType || 'default'}
                    multiline={props.multiline}
                    secureTextEntry={props.secureTextEntry || false}
                    maxLength={props.maxLength || 250}
                    >
                </TextInput>

                {props.rightIcon ? <TouchableOpacity onPress={() => props.onRightIcon()}>
                    <Image source={props.rightIcon} style={{ marginRight: 10 }} />
                </TouchableOpacity> : null}
            </View>

            {/* <View style={styles.bottomBorder} /> */}
        </View>

    );
};

const styles = StyleSheet.create({
    title: { fontFamily: fonts.REGULAR, color: colors.text_color, fontWeight: '500', lineHeight: 21 },
    textInputStyle: {
        flex: 1,
        fontFamily: fonts.REGULAR,
        color: colors.input_color,
        fontWeight: '400',
        fontSize: hp(1.6),
        padding: 10,
        margin: 0
    },
    bottomBorder: { height: 1, backgroundColor: colors.sky, marginTop: Platform.OS == 'android' ? 10 : 15 }
})
export default TextInputField;
