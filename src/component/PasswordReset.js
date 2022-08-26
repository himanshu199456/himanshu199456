import React, { Component } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Assets } from '../assets';
import colors from '../utils/colors';
import { fonts } from '../utils/fonts';

const PasswordReset = (props) => {

    return (
        <Modal
            transparent={true}
            visible={props.isVisible}
            onRequestClose={props.onCloseClick}>
            <TouchableOpacity
                activeOpacity={1}
                style={styles.modalContainer}>
                <View style={styles.modalSubContainer}>
                    <Image source={Assets.KEY} style={{ alignSelf: 'center' }} />
                    <Text style={{ textAlign: 'center', marginTop: 20, marginHorizontal: 30, fontFamily: fonts.REGULAR, fontWeight: '500', fontSize: 20, color: colors.blue }}>{"Your Password has been reset!"}</Text>
                    <TouchableOpacity style={{ borderRadius: 4, marginTop: 50, backgroundColor: colors.blue, padding: 20,paddingVertical:10 }} onPress={props.onDoneClick}>
                        <Text style={{ textAlign: 'center', color: colors.white, fontFamily: fonts.REGULAR, fontSize: 22, fontWeight: '400' }}>{"Done"}</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Modal>
    )
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: colors.transparent
    },
    modalSubContainer: {
        borderRadius: 8, backgroundColor: colors.white, shadowOpacity: 0.2,
        elevation: 5, width: "90%", padding: 40,
    },
    title: { textAlign: "center" },
    text: { fontSize: 16, marginTop: 10 }
})

export default PasswordReset;
