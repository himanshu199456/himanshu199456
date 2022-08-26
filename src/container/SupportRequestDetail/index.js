
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, FlatList, Image, ImageBackground, KeyboardAvoidingView, Platform, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSelector, useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import { Assets } from '../../assets';
import BaseContainer from '../../component/BaseContainer';
import Loader from '../../component/Loader';
import MTButton from '../../component/MTButton';
import colors from '../../utils/colors';
import { fonts } from '../../utils/fonts';
import { getSupportRequestDetail, resetError, saveSupportReply } from './action';
import styles from './styles';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import DropDownPicker from 'react-native-dropdown-picker';
import { useIsFocused } from '@react-navigation/core';


const SupportRequestDetail = (props) => {

    const [message, setMessage] = useState('')
    const [user, setUser] = useState('')
    const [openCloseTicket, setOpenCloseTicket] = useState(false);
    const [valueCloseTicket, setValueCloseTicket] = useState('No');
    const [closeTicketData, setCloseTicketData] = useState([{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }]);
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    const { supportRequestDetail, error, loading, saveReplySuccess } = useSelector((state) => ({
        supportRequestDetail: state.SupportDetail.supportRequestDetail,
        error: state.SupportDetail.error,
        loading: state.SupportDetail.loading,
        saveReplySuccess: state.SupportDetail.saveReplySuccess,
    }));


    useEffect(async () => {
        console.log(" PROPS 22", props);
        let userData = await AsyncStorage.getItem('token');
        console.log(" USER DATA 111", userData);
        userData = JSON.parse(userData);
        console.log(" USER DATA ", userData);
        setUser(userData)
        dispatch(getSupportRequestDetail(props.route.params.item.support_ticket_id))
    }, [isFocused])

    useEffect(() => {
        console.log(" USER ", saveReplySuccess);
        console.log(" USER error", error);
        if (saveReplySuccess != null) {
            console.log(" USER 111", saveReplySuccess);
            setMessage('')
            dispatch(resetError());
            dispatch(getSupportRequestDetail(props.route.params.item.support_ticket_id))
        }
        if (error != null) {
            Alert.alert('Alert', error, [
                {
                    text: 'OK',
                    onPress: () => {
                        dispatch(resetError());
                    },
                },
            ]);
        }
    }, [error, saveReplySuccess]);

    const onMessageChange = (text) => {
        setMessage(text)
    }

    const onProfile = () => {
        props.navigation.navigate('Profile')
    }

    const onNotification = () => {

    }

    const onMenu = () => {
        props.navigation.openDrawer();
    }

    const onSubmit = () => {

        if (message == '') {
            alert('Please enter messsage')
            return
        }

        let formData = new FormData()
        formData.append('support_ticket_id', props.route.params.item.support_ticket_id)
        formData.append('comment', message)
        formData.append('ticket_closed', valueCloseTicket)

        dispatch(saveSupportReply(formData))
        // props.navigation.navigate('SupportTicket')
    }

    const getActiveCount = () => {
        let count = 0;
        if (supportRequestDetail.line_gauge_data.attorney_assigned == 1) {
            count = count + 1
        }

        if (supportRequestDetail.line_gauge_data.closed == 1) {
            count = count + 1
        }

        if (supportRequestDetail.line_gauge_data.new_ticket == 1) {
            count = count + 1
        }

        if (supportRequestDetail.line_gauge_data.resolved == 1) {
            count = count + 1
        }

        if (supportRequestDetail.line_gauge_data.work_in_progress == 1) {
            count = count + 1
        }
        console.log(" count ", count);
        return count
    }

    const defaultScrollViewProps = {
        keyboardShouldPersistTaps: 'handled',
        contentContainerStyle: {
            flex: 1,
            justifyContent: 'center',
            testAlign:'center',
            alignItems:'center'
        }
    };

    return (
        <BaseContainer
            {...props}
            left={Assets.MENU}
            onLeft={onMenu}
            right={[Assets.PROFILE, Assets.NOTIFICATION]}
            onRight={[onProfile, onNotification]}
            title={"Support Request Detail"}
        >
            <ScrollView>
                {console.log(" supportRequestDetail ", supportRequestDetail)}
                {supportRequestDetail != null ?
                    <View>
                        <View style={{ marginHorizontal: 20 }}>
                            <ProgressSteps 
                             activeStep={getActiveCount() == 5 ?  0 : getActiveCount()}
                             labelFontSize={12} 
                             activeLabelFontSize={12} 
                             isComplete={getActiveCount() == 5 ? true : false}
                                completedLabelColor={'#4BB543'}
                                activeLabelColor={'lightgray'}
                                activeStepIconBorderColor={'lightgray'}
                            >
                                <ProgressStep label="New Support Ticket" removeBtnRow={true}  />
                                <ProgressStep label="Attorney Assigned" removeBtnRow={true}  />
                                <ProgressStep label="Work In Progress" removeBtnRow={true}  />
                                <ProgressStep label="Resolved" removeBtnRow={true}  />
                                <ProgressStep label="closed" removeBtnRow={true}  />
                            </ProgressSteps>
                        </View>
                        <View style={{ padding: 20 }}>
                            <Text style={{ fontFamily: fonts.REGULAR, color: colors.text_light, fontSize: 20, fontWeight: '600' }}>{supportRequestDetail["0"].title}</Text>
                            <TouchableOpacity style={{ marginTop: 15, flexDirection: 'row', borderRadius: 4, backgroundColor: colors.blue, padding: 5, paddingHorizontal: 15, alignSelf: 'baseline' }}>
                                <Text style={{ color: colors.white, fontFamily: fonts.REGULAR, fontSize: 10, fontWeight: '500', }}>{supportRequestDetail["0"].status}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, backgroundColor: colors.SCREEN_BACKGROUND }}>

                            <Text style={{ opacity: 0.6, color: colors.black, fontFamily: fonts.REGULAR, fontSize: 12, fontWeight: '400', padding: 40, alignSelf: "center", textAlign: "center" }}>{supportRequestDetail["0"].content}</Text>
                            <Text style={{ color: colors.black, fontFamily: fonts.REGULAR, fontSize: 12, fontWeight: '400', alignSelf: "center", textAlign: "center" }}>{moment(supportRequestDetail["0"].ticket_date).format('DD MMM h:mm A')}</Text>
                            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 20, marginBottom: 20 }}>
                                <Image source={{ uri: supportRequestDetail["0"].image }} style={{ width: 29, height: 29, borderRadius: 200 }} resizeMode={"contain"} />

                                <Text style={{ marginLeft: 10, color: colors.black, fontFamily: fonts.REGULAR, fontSize: 17, fontWeight: '400', alignSelf: "center", textAlign: "center" }}>{supportRequestDetail["0"].assigned_to_user}</Text>

                            </View>
                            <Text style={{ color: colors.black, fontFamily: fonts.REGULAR, fontSize: 12, fontWeight: '400', alignSelf: "center", textAlign: "center" }}>{"is now your personal assistant for this request"}</Text>
                            <Text style={{ color: colors.black, fontFamily: fonts.REGULAR, fontSize: 12, fontWeight: '400', alignSelf: "center", textAlign: "center" }}>{moment(supportRequestDetail["0"].ticket_date).format('DD MMM h:mm A')}</Text>
                            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 20, marginBottom: 20 }}>
                                <Image source={{ uri: "https://picsum.photos/29/29" }} style={{ width: 29, height: 29, borderRadius: 200 }} resizeMode={"contain"} />
                                <View style={{ width: "60%", backgroundColor: colors.white, flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 7, borderRadius: 4, marginLeft: 10 }}>

                                    <Text style={{ color: colors.black, fontFamily: fonts.REGULAR, fontSize: 11, fontWeight: '400', alignSelf: "center", textAlign: "center", padding: 5, }}>{"Changed status to"}</Text>
                                    <TouchableOpacity style={{ marginLeft: 15, flexDirection: 'row', borderRadius: 4, backgroundColor: colors.blue, padding: 5, paddingHorizontal: 15, alignSelf: 'baseline', justifyContent: "center" }}>
                                        <Text style={{ color: colors.white, fontFamily: fonts.REGULAR, fontSize: 10, fontWeight: '500', }}>{supportRequestDetail["0"].status}</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>
                            {
                                supportRequestDetail["0"] != null && supportRequestDetail["0"].comments.map((data, index) => {
                                    return (
                                        <View key={index} style={{ flexDirection: user.user_id != data.user_id ? "row" : 'row-reverse', justifyContent: "center", alignItems: "center", marginTop: 20, marginBottom: 20 }}>
                                            <Image source={{ uri: user.user_id != data.user_id ? supportRequestDetail["0"].image : user.profile_img }} style={{ width: 30, height: 30, borderRadius: 60 }} />
                                            <View style={{ width: "60%", backgroundColor: colors.white, flexDirection: "row", alignItems: "center", padding: 7, borderRadius: 4, marginLeft: user.user_id != data.user_id ? 10 : 0, marginRight: user.user_id != data.user_id ? 0 : 10 }}>
                                                <Text style={{ color: colors.black, fontFamily: fonts.REGULAR, fontSize: 11, fontWeight: '400', alignSelf: "flex-start", textAlign: "left", padding: 5, }}>{data.comment_text}</Text>
                                            </View>
                                        </View>
                                    )
                                })
                            }

                            <TextInput
                                placeholder={'Message'}
                                style={{ backgroundColor: colors.white, textAlignVertical: 'top', textAlign: 'left', fontFamily: fonts.REGULAR, borderRadius: 4, borderColor: colors.light_gray_text, borderWidth: 1, marginHorizontal: 10, padding: 10, height: 150, marginVertical: 30 }}
                                multiline={true}
                                value={message}
                                onChangeText={onMessageChange}
                            />

                            <View style={{ marginHorizontal: 16 }}>
                                <Text style={{ fontSize: 13, fontFamily: fonts.REGULAR, fontWeight: '500', color: colors.text_light, marginTop: 20 }}>{'Do you want to close this ticket?'}</Text>
                                <DropDownPicker
                                    open={openCloseTicket}
                                    value={valueCloseTicket}
                                    items={closeTicketData}
                                    setOpen={setOpenCloseTicket}
                                    setValue={setValueCloseTicket}
                                    // onChangeValue={onMemberChange}
                                    listMode={'SCROLLVIEW'}
                                    style={{ marginTop: 10, borderWidth: 1, borderColor: colors.border_color, borderRadius: 5, height: 40 }}
                                    textStyle={{ fontFamily: fonts.REGULAR, fontSize: 13, color: colors.text_light, opacity: 0.7 }}
                                    labelStyle={{ padding: 2 }}
                                    zIndex={4000}
                                    zIndexInvers={3000}
                                />
                            </View>
                            <MTButton title={'Submit'} style={{ marginBottom: 30 }} onClick={onSubmit} />

                        </View>
                    </View>
                    : null
                }
            </ScrollView>
        </BaseContainer>
    )
}


export default SupportRequestDetail
