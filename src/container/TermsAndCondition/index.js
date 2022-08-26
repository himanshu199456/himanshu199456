
import React, { useEffect, useRef, useState } from 'react';
import { Alert, FlatList, Image, ImageBackground, KeyboardAvoidingView, Platform, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Assets } from '../../assets';
import BaseContainer from '../../component/BaseContainer';
import WebView from 'react-native-webview';
import { getTermsAndConditionData } from './actions';

const TermsAndCondition = (props) => {

    const videoRef = useRef()
    const [isRecording, setIsRecording] = useState(false)

    const dispatch = useDispatch();

    useEffect(async () => {
        console.log(" PROPS ", props);
        dispatch(getTermsAndConditionData())
    }, [])

    const onMenu = () => {
        props.navigation.goBack()
    }
    const { error, loading, data } = useSelector((state) => ({
        error: state.TermsCondition.error,
        loading: state.TermsCondition.loading,
        data: state.TermsCondition.data,
    }));

    return (
        <BaseContainer
            {...props}
            isHideIcon={true}
            // right={[Assets.PROFILE, Assets.NOTIFICATION]}
            // onRight={[onProfile, onNotification]}
            title={"Terms & Conditions"}
        >
            {console.log(" data ",data)}
            {data != null ?
            <View style={{padding:20, flex:1}}>
            <WebView 
                    originWhitelist={['*']}
                    source={{ html: data.description }}
                />
            </View>
                 : null}
        </BaseContainer>
    )
}


export default TermsAndCondition
