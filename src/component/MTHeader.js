import React, { FC } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Assets } from '../assets';
import colors from '../utils/colors';
import { fonts } from '../utils/fonts';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const MTHeader = (props) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={{ flex: 1, paddingLeft: 20 }} onPress={props.onLeft ? props.onLeft : () => { }}>
                {props.left != undefined ? <Image style={{tintColor: colors.blue}} source={props.left} /> : <View />}
            </TouchableOpacity>
            <View style={{ flex: 2.5 }}>
                <Text style={styles.title}>{props.title}</Text>
            </View>
            <View style={styles.rightContainer}>
                {
                    props.right != undefined && props.right.length > 0 ?
                        props.right.map((data, index) => {
                            return (
                                <TouchableOpacity key={index} onPress={props.onRight[index] ? props.onRight[index] : () => { }}>
                                    <Image source={data} style={{ marginRight: 10, tintColor: colors.blue }} />
                                </TouchableOpacity>
                            )
                        })
                        :
                        <View />
                }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flexDirection: 'row', paddingVertical: 10, alignItems: 'center', borderBottomColor: colors.HEADER_BOTTOM, borderBottomWidth: 1, },
    title: { fontFamily: fonts.MEDIUM_500, fontSize: 18, textAlign: 'center', color: colors.blue },
    rightContainer: { flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }
})
export default MTHeader;
