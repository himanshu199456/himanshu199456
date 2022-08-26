import React, { Component } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../utils/colors';
import { Strings } from '../utils/string';


const PhotoSelect = (props) => {

    return (
        <Modal
            transparent={true}
            visible={props.isVisible}
            onRequestClose={props.onCloseClick}>
            <TouchableOpacity
                activeOpacity={1}
                style={styles.modalContainer}>
                <View style={styles.modalSubContainer}>
                    <Text style={styles.title}>{Strings.SELECT_PHOTO}</Text>
                    <TouchableOpacity onPress={props.cameraClick}>
                        <Text style={styles.text}>{Strings.TAKE_PHOTO}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={props.galleryClick}>
                        <Text style={styles.text}>{Strings.SELECT_FROM_GALLERY}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={props.onCloseClick}>
                        <Text style={[styles.text, { textAlign: 'right' }]}>
                            {Strings.CANCEL}
                        </Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Modal>
    )
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: colors.shadow
    },
    modalSubContainer: {
        borderRadius: 8, backgroundColor: colors.white, shadowOpacity: 0.2,
        elevation: 5, width: "70%", padding: 20
    },
    title: { textAlign: "center" },
    text: { fontSize: 16, marginTop: 10 }
})

export default PhotoSelect;
