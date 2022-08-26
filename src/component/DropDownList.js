import React, { Component } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import colors from '../utils/colors';
import { fonts } from '../utils/fonts';
import { Strings } from '../utils/string';


const DropDownList = (props) => {

    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity style={{ margin: 5,borderBottomWidth:0.2,padding:5 }} onPress={() => props.onItemSelect(item, index)}>
                <Text style={{ fontFamily: fonts.REGULAR_400, fontSize: 15 }}>{item.value}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <Modal
            transparent={true}
            visible={props.isVisible}
            onRequestClose={props.onCloseClick}>
            <TouchableOpacity
                activeOpacity={1}
                style={styles.modalContainer}>
                <View style={styles.modalSubContainer}>
                    <FlatList
                    style={{}}
                        data={props.data}
                        renderItem={renderItem}
                        keyExtractor={(item)=>item.id}
                    />
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
        elevation: 5, width: "94%", padding: 20,marginVertical:50
    },
    title: { textAlign: "center" },
    text: { fontSize: 16, marginTop: 10 }
})

export default DropDownList;
