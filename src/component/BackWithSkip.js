import React, { FC } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Assets } from '../assets';
import colors from '../utils/colors';
import { fonts } from '../utils/fonts';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const BackWithSkip = (props) => {
    return (
        <View style={[styles.container, props.style]}>
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
                {/* <Image source={props.isSky ? Assets.BACK_SKY : Assets.BACK} /> */}
            </TouchableOpacity>

            <TouchableOpacity onPress={props.onSkip}>
                <Text style={[styles.title, props.titleStyle]}>{"Skip"}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, },
    title: { color: colors.white, fontFamily: fonts.SEMI_BOLD }
})
export default BackWithSkip;
