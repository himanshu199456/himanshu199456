
import AsyncStorage from '@react-native-community/async-storage';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Alert, Image, PermissionsAndroid, Platform, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { Assets } from '../../assets';
import BaseContainer from '../../component/BaseContainer';
import HomeOption from '../../component/HomeOption';
import Loader from '../../component/Loader';
import MTHeader from '../../component/MTHeader';
import colors from '../../utils/colors';
import { fonts } from '../../utils/fonts';
import { logoutAction } from '../Login/actions';
import { getMasterDetails, getCityByState, getCourtByCity, saveTicket, resetError, getEditTicketDetail, getSubMemberList } from './actions';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import PhotoSelect from '../../component/PhotoSelect';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker'
import DropDownList from '../../component/DropDownList';
import { useIsFocused } from '@react-navigation/core';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { smartScale } from '../../utils/matrics';


const PostTicket = (props) => {
    const { masterData, error, loading, city, court, success, ticketDetail, subMemberList } = useSelector((state) => ({
        masterData: state.TicketReducer.masterData,
        error: state.TicketReducer.error,
        loading: state.TicketReducer.loading,
        city: state.TicketReducer.city,
        court: state.TicketReducer.court,
        success: state.TicketReducer.saveSuccess,
        ticketDetail: state.TicketReducer.ticketDetail,
        subMemberList: state.TicketReducer.subMemberList
    }));

    const dispatch = useDispatch();
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const [isShowDropDown, setIsShowDropDown] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(false)
    const [isNext, setIsNext] = useState(false)

    const [masterDetail, setMasterData] = useState(null)
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');

    const [isVisible, setIsVisible] = useState(false)
    const [ticketPhoto, setTicketPhoto] = useState(null)
    const [isTicketPhotoChange, setIsTicketPhotoChange] = useState(false)
    const [accidentPhoto, setAccidentPhoto] = useState(null)
    const [isAccidentPhotoChange, setIsAccidentPhotoChange] = useState(false)
    const [isTicketPhoto, setIsTicketPhoto] = useState(false)
    const [attachment, setAttachment] = useState(null)
    const [accidentDetail, setAccidentDetail] = useState(null)
    const [numberOfViolation, setNumberOfViolation] = useState([null])

    const [isShowMultipleViolation, setIsShowMultipleViolation] = useState(false)
    const [isCourtSchedule, setIsCourtSchedule] = useState(false)

    const [openMember, setOpenMember] = useState(false);
    const [member, setMember] = useState('');

    const [openCity, setOpenCity] = useState(false);
    const [valueCity, setValueCity] = useState('');
    // const [selectCity, setCity] = useState([{ label: 'Eligible City', value: 'Eligible City' }]);

    const [openViolations, setOpenViolations] = useState(false);
    const [valueViolations, setValueViolations] = useState('No');
    const [violations, setViolations] = useState([{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }]);

    const [openNumberViolations, setOpenNumberViolations] = useState(false);
    const [valueNumberViolations, setValueNumberViolations] = useState(null);
    let numViolation = []
    for (var i = 1; i <= 10; i++) {
        numViolation[numViolation.length] = {
            label: String(i),
            value: String(i),
        }
    }
    const [numberViolations, setNumberViolations] = useState(numViolation);

    const [openDate, setOpenDate] = useState(false)
    const [valueTicket, setValueTicket] = useState(new Date());

    const [openCourtTime, setOpenCourtTime] = useState(false)
    const [courtTime, setCourtTime] = useState(new Date());

    const [openCourtDate, setOpenCourtDate] = useState(false)
    const [courtDate, setCourtDate] = useState(new Date());

    const [openTicketScheduled, setOpenTicketScheduled] = useState(false);
    const [valueTicketScheduled, setValueTicketScheduled] = useState('No');
    const [ticketScheduled, setSelectTicketScheduled] = useState([{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }]);

    const [openCountry, setOpenCountry] = useState(false);
    const [valueCountry, setValueCountry] = useState('');
    const isFocused = useIsFocused();
    useEffect(async () => {
        console.log(" PROPS post ", props);
        let userData = await AsyncStorage.getItem('token');
        console.log(" USER DATA 111", userData);
        userData = JSON.parse(userData);
        console.log(" USER DATA ", userData);
        setUser(userData)
        if (isFocused) {
            checkPermission()
            if (props.route.params.item != undefined) {
                dispatch(getEditTicketDetail(props.route.params.item.id))
            } else {
                resetData()
            }
            resetData()
            dispatch(resetError());
            dispatch(getMasterDetails())
            dispatch(getSubMemberList())

        }
    }, [isFocused])

    useLayoutEffect(() => {
        return async () => {
            dispatch(resetError());
        };
    }, []);

    const checkPermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const grants = await PermissionsAndroid.requestMultiple([
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                ]);
                console.log('write external stroage', grants);
                if (
                    grants['android.permission.CAMERA'] ===
                    PermissionsAndroid.RESULTS.GRANTED
                ) {
                    console.log('Permissions granted');
                } else {
                    console.log('All required permissions not granted');
                    return;
                }
            } catch (err) {
                console.log(" CHECK FOR THE ERROR ", err);
                return;
            }
        }
    }

    const resetData = () => {
        setIsShowDropDown(false)
        setCurrentIndex(false)
        setIsNext(false)

        setMasterData(null)
        setOpen(false);
        setValue('');

        setIsVisible(false)
        setTicketPhoto(null)
        setIsTicketPhotoChange(false)
        setAccidentPhoto(null)
        setIsAccidentPhotoChange(false)
        setIsTicketPhoto(false)
        setAttachment(null)
        setAccidentDetail(null)
        setNumberOfViolation([null])

        setIsShowMultipleViolation(false)
        setIsCourtSchedule(false)

        setOpenMember(false);
        setMember('');

        setOpenCity(false);
        setValueCity('');
        // const [selectCity, setCity([{ label: 'Eligible City', value: 'Eligible City' }]);

        setOpenViolations(false);
        setValueViolations('No');
        setViolations([{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }]);

        setOpenNumberViolations(false);
        setValueNumberViolations(null);
        let numViolation = []
        for (var i = 1; i <= 10; i++) {
            numViolation[numViolation.length] = {
                label: String(i),
                value: String(i),
            }
        }
        setNumberViolations(numViolation);

        setOpenDate(false)
        setValueTicket(new Date());

        setOpenCourtTime(false)
        setCourtTime(new Date());

        setOpenCourtDate(false)
        setCourtDate(new Date());

        setOpenTicketScheduled(false);
        setValueTicketScheduled('No');
        setSelectTicketScheduled([{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }]);

        setOpenCountry(false);
        setValueCountry('');
    }

    useEffect(() => {
        if (success != null) {
            Alert.alert('Success', success, [
                {
                    text: 'OK',
                    onPress: () => {
                        dispatch(resetError());
                        props.navigation.goBack()
                    },
                }
            ])
        }

        console.log(" masterData ", masterData);
        if (masterData != null) {
            // alert(success)
            setMasterData(masterData)
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

        if (ticketDetail != null && masterDetail != null && props.route.params.isEdit) {
            console.log(" ticketDetail ", ticketDetail);
            setTicketPhoto({ uri: ticketDetail.ticket_photo })
            // ticketDetail.state_id
            console.log(" masterDetail ", masterDetail);
            let findData = masterDetail.states.filter(data => data.id == ticketDetail.state_id)
            console.log(" FIND DATA ", findData);
            if (findData.length > 0) {
                setValue(findData[0].value)
                setStateValue(findData[0].value)
            }

            setValueViolations(capitalizeFirstLetter(ticketDetail.multiple_violation))
            onViolationStatusChange(capitalizeFirstLetter(ticketDetail.multiple_violation))

            setValueNumberViolations(String(ticketDetail.no_of_violation))
            onNumberViolationsChange(String(ticketDetail.no_of_violation))

            ticketDetail.ticket_violations.map((data, index) => {
                let violationData = masterDetail.violations.filter(item => item.id == data.violation_id)
                if (violationData.length > 0) {
                    setMultiViolationValue(violationData[0], index)
                }
            })

            setValueTicketScheduled(capitalizeFirstLetter(ticketDetail.is_court_date_scheduled))
            onTicketSchedule(capitalizeFirstLetter(ticketDetail.is_court_date_scheduled))

            setValueTicket(new Date(moment(ticketDetail.get_ticket_date).format('YYYY/MM/DD')))

            if (String(ticketDetail.is_court_date_scheduled) == "no") {
                setIsCourtSchedule(false)
            } else {
                setIsCourtSchedule(true)
                setCourtDate(new Date(moment(ticketDetail.court_scheduled_date).format('YYYY/MM/DD')))

                if (ticketDetail.court_scheduled_time != null) {
                    const fullDate = new Date();
                    const time = ticketDetail.court_scheduled_time;
                    const d = moment(fullDate).format('L'); // d = "12/12/2017"
                    const date = moment(d + ' ' + time).format();
                    console.log(" moment(date).toDate() ", moment(date).toDate());
                    console.log(" moment(date).toDate() 111 ", new Date(moment(date)));
                    setCourtTime(moment(date).toDate())
                    // setCourtTime(new Date(moment(ticketDetail.court_scheduled_time, 'HH:mm:ss').format('HH:mm:ss')))
                }
            }



            setAccidentDetail(ticketDetail.accident_details)
            setAccidentPhoto({ uri: ticketDetail.accident_photo })
        }

        // if (city != null && ticketDetail != null && valueCity == '' && props.route.params.isEdit) {
        //     let findData = city.city.filter(data => data.id == ticketDetail.city_id)
        //     console.log(" FIND DATA CITY ", findData);
        //     if (findData.length > 0) {
        //         setValueCity(findData[0].value)
        //         onCityChange(findData[0].value)
        //     }
        // }

        // if (court != null && ticketDetail != null && valueCountry == '' && props.route.params.isEdit) {
        //     let findData = court.court.filter(data => data.id == ticketDetail.court_id)
        //     console.log(" FIND DATA Court ", findData);
        //     if (findData.length > 0) {
        //         setValueCountry(findData[0].value)
        //     }
        // }
        // subMemberList.member_list
        if (subMemberList != null && ticketDetail != null && member == '' && props.route.params.isEdit) {
            let findData = subMemberList.member_list.filter(data => data.id == ticketDetail.sub_member_id)
            console.log(" FIND DATA Court ", findData);
            if (findData.length > 0) {
                setMember(findData[0].value)
            }
        }

    }, [error, masterData, success, ticketDetail, masterDetail, value, valueCity, subMemberList]);

    useEffect(() => {
        if (city != null && ticketDetail != null && valueCity == '' && props.route.params.isEdit) {
            let findData = city.city.filter(data => data.id == ticketDetail.city_id)
            console.log(" FIND DATA CITY ", findData);
            if (findData.length > 0) {
                setValueCity(findData[0].value)
                onCityChange(findData[0].value)
            }
        }

        console.log('court != null && ticketDetail != null && valueCountry == ', court != null && ticketDetail != null && valueCountry == '' && props.route.params.isEdit);
        console.log('court != null && ticketDetail != null && valueCountry == 111', court);
        console.log('court != null && ticketDetail != null && valueCountry == 222', ticketDetail);
        console.log('court != null && ticketDetail != null && valueCountry == 333', valueCountry);
        console.log('court != null && ticketDetail != null && valueCountry == 444', props.route.params.isEdit);
        if (court != null && ticketDetail != null && valueCountry == '' && props.route.params.isEdit) {
            let findData = court.court.filter(data => data.id == ticketDetail.court_id)
            console.log(" FIND DATA Court ", findData);
            if (findData.length > 0) {
                setValueCountry(findData[0].value)
            }
        }
    }, [city, court])

    const setStateValue = (item) => {
        console.log(" CHECK ITEM ", item);
        let findData = masterData.states.filter(data => data.value == item)
        console.log(" FIND DATA STATE CHANGE", findData);
        if (findData != undefined && findData.length > 0) {
            let formData = new FormData()
            formData.append('state_id', findData[0].id)
            dispatch(getCityByState(formData))
        }
    }

    const onCityChange = (item) => {
        console.log(" CHECK ITEM CITY ", item);
        let findData = city.city.filter(data => data.value == item)
        console.log(" FIND DATA CITY ", findData);
        if (findData != undefined && findData.length > 0) {
            let formData = new FormData()
            formData.append('city_id', findData[0].id)
            dispatch(getCourtByCity(formData))
        }
    }

    const onViolationStatusChange = (item) => {
        console.log(" CHECK ITEM ", item);
        if (item == 'Yes') {
            setIsShowMultipleViolation(true)
        } else {
            setIsShowMultipleViolation(false)
        }
    }

    // const onMemberChange = (item) => {
    //     console.log(" CHECK onMemberChange ", item);
    //     let findData = city.city.filter(data => data.value == item)
    //     console.log(" FIND DATA CITY ", findData);
    //     if (findData != undefined && findData.length > 0) {
    //     }
    // }

    const onTicketSchedule = (item) => {
        console.log(" CHECK ITEM ", item);
        if (item == 'Yes') {
            setIsCourtSchedule(true)
        } else {
            setIsCourtSchedule(false)
        }
    }

    const onNumberViolationsChange = (item) => {
        console.log(" onNumberViolationsChange ", item);
        let createArray = Array.from(Array(parseInt(item)).keys())
        let newArray = []
        createArray.map((data, index) => {
            newArray[newArray.length] = null
        })
        setNumberOfViolation(newArray)

        // setOpenSelectViolations(openArray)
        // setValueSelectViolations(valueSelection)
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const onCloseClick = () => {
        setIsVisible(false)
    }

    const cameraClick = () => {
        launchCamera({
            mediaType: 'photo',
            // quality: 0.5,
            // saveToPhotos: true
        }, response => {
            console.log(" IMAGES ", response);
            // setProfileURL(images)
            if (response.assets) {
                if (isTicketPhoto) {
                    setIsTicketPhotoChange(true)
                    setTicketPhoto(response.assets[0])
                } else {
                    setIsAccidentPhotoChange(true)
                    setAccidentPhoto(response.assets[0])
                }
            }
            onCloseClick();
        })
    }

    const galleryClick = () => {
        launchImageLibrary({
            mediaType: 'photo',
            quality: 0.5,
            saveToPhotos: true,
            // selectionLimit: 5
        }, response => {
            console.log(" IMAGES ", response);
            if (response.assets) {
                if (isTicketPhoto) {
                    setIsTicketPhotoChange(true)
                    setTicketPhoto(response.assets[0])
                } else {
                    setIsAccidentPhotoChange(true)
                    setAccidentPhoto(response.assets[0])
                }
            }
            onCloseClick();
        })
    }

    const renderPhotoSelection = () => {
        return (
            <PhotoSelect
                isVisible={isVisible}
                onCloseClick={onCloseClick}
                cameraClick={cameraClick}
                galleryClick={galleryClick}
            />
        );
    }

    const onTicketPhotoClick = () => {
        setIsTicketPhoto(true)
        setIsVisible(true)
    }

    const onAccidentPhotoClick = () => {
        setIsTicketPhoto(false)
        setIsVisible(true)
    }

    const onAttachment = async () => {
        try {
            const res = await DocumentPicker.pick({ type: [DocumentPicker.types.video, DocumentPicker.types.audio] })
            console.log(' CHECK RESULT ', res)
            let prevAttachment = []
            if (attachment != null) {
                prevAttachment = attachment
            }
            prevAttachment[prevAttachment.length] = res[0]
            console.log(" prevAttachment ", prevAttachment);
            setAttachment([...prevAttachment])
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                // User cancelled the picker, exit any dialogs or menus and move on
            } else {
                throw err
            }
        }
    }

    const onAccidentDetailChange = (text) => {
        setAccidentDetail(text)
    }

    const checkValidation = () => {
        if (ticketPhoto == null) {
            alert('Please select ticket photo.')
            return false
        } else if (value == '') {
            alert('Please select where did you get ticket?')
            return false
        } else if (valueCity == '') {
            alert('Please select city')
            return false
        }
        // else if (valueSelectViolations == '') {
        //     alert('Please select violation you received.')
        //     return false
        // } else if (valueSelectViolations2 == '') {
        //     alert('Please select violation you received.')
        //     return false
        // }
        else if (valueViolations == "No" && numberOfViolation[0] == null) {
            alert('Please select the violations you received')
            return false
        }
        else if (valueViolations == "Yes" && valueNumberViolations == null) {
            alert('Please select number of violations')
            return false
        }
        else if (valueViolations == "Yes" && valueNumberViolations != null && numberOfViolation.filter(data => data == null).length > 0) {
            alert('Please select all the violations you received')
            return false
        }
        else if (valueTicket == null) {
            alert('Please date of ticket')
            return false
        } else if (valueCountry == '') {
            alert('Please select court')
            return false
        }
        // else if (valueCountry == null) {
        //     alert('Please select court')
        //     return false
        // }

        // else if (accidentPhoto == null) {
        //     alert('Please select accident photo')
        //     return false
        // } else if (accidentDetail == '') {
        //     alert('Please enter accident detail')
        //     return false
        // } 
        // else if (attachment == null) {
        //     alert('Please select attachment')
        //     return false
        // }
        return true
    }

    const onSubmit = () => {

        if (!checkValidation()) {
            return
        }

        let formData = new FormData();
        if (ticketDetail != null && props.route.params.isEdit) {
            formData.append('id', ticketDetail.id)
        }
        console.log("isTicketPhotoChange", isTicketPhotoChange);
        if (isTicketPhotoChange) {
            formData.append('ticket_photo', {
                name: ticketPhoto.fileName,
                type: ticketPhoto.type,// 'image/jpeg',
                uri: Platform.OS === 'ios' ? ticketPhoto.uri.replace('file://', '') : ticketPhoto.uri,
            })
        }

        console.log("isAccidentPhotoChange", isAccidentPhotoChange);
        if (isAccidentPhotoChange) {
            if (accidentPhoto != null) {
                formData.append('accident_photo', {
                    name: accidentPhoto.fileName,
                    type: accidentPhoto.type,// 'image/jpeg',
                    uri: Platform.OS === 'ios' ? accidentPhoto.uri.replace('file://', '') : accidentPhoto.uri,
                })
            }
        }

        let findData = masterData.states.filter(data => data.value == value)
        console.log(" FIND DATA ", findData);
        if (findData != undefined && findData.length > 0) {
            formData.append('state_id', findData[0].id)
        }

        let findCity = city.city.filter(data => data.value == valueCity)
        console.log(" FIND DATA CITY ", findCity);
        if (findCity != undefined && findCity.length > 0) {
            formData.append('city_id', findCity[0].id)
        }


        formData.append('multiple_violation', valueViolations)
        console.log(' numberOfViolation ', numberOfViolation);
        if (numberOfViolation.length > 0) {
            formData.append('no_of_violation', parseInt(numberOfViolation.length))
            console.log(" numberOfViolation ", numberOfViolation);
            numberOfViolation.map((data, index) => {
                console.log(" data  ", data);
                formData.append(`ticket_violations[${index}]`, data.id)
            })
        }
        // let violations1 = masterData.violations.filter(data => data.value == valueSelectViolations)[0]
        // formData.append('ticket_violations[0]', violations1.id)

        // let violations2 = masterData.violations.filter(data => data.value == valueSelectViolations2)[0]
        // formData.append('ticket_violations[1]', violations2.id)

        formData.append('get_ticket_date', moment(valueTicket).format('YYYY/MM/DD'))

        formData.append('is_court_date_scheduled', valueTicketScheduled)
        if (valueTicketScheduled == 'Yes') {
            formData.append('court_scheduled_date', moment(courtDate).format('YYYY/MM/DD'))
            formData.append('court_scheduled_time', moment(courtTime).format('HH:mm:ss'))
        }

        let findCourt = court.court.filter(data => data.value == valueCountry)
        console.log(" FIND DATA CITY ", findCourt);
        if (findCourt != undefined && findCourt.length > 0) {
            formData.append('court_id', findCourt[0].id)
        }

        let findMember = subMemberList.member_list.filter(data => data.value == member)
        console.log(" FIND DATA CITY ", findMember);
        if (findMember != undefined && findMember.length > 0) {
            formData.append('sub_member_id', findMember[0].id)
        }

        formData.append('accident_details', accidentDetail != null ? accidentDetail : '')
        // if (attachment != null) {
        //     console.log(" CHECK ATTACHMENT ", attachment);
        //     formData.append('ticket_media[0]', {
        //         name: attachment.name,
        //         type: attachment.type,// 'image/jpeg',
        //         uri: Platform.OS === 'ios' ? attachment.uri.replace('file://', '') : attachment.uri,
        //     })
        // }

        if (attachment != null) {
            attachment.map((data, index) => {
                formData.append(`ticket_media[${index}]`, {
                    name: data.name,
                    type: data.type,// 'image/jpeg',
                    uri: Platform.OS === 'ios' ? data.uri.replace('file://', '') : data.uri,
                })
            })
        }

        console.log(" CHECK REQUEST DATA ", formData);
        dispatch(saveTicket(formData))
    }

    const onCloseList = () => {
        setIsShowDropDown(false)
    }

    const renderDropDown = () => {
        return (
            <DropDownList
                isVisible={isShowDropDown}
                data={masterData.violations}
                onCloseClick={onCloseList}
                onItemSelect={(item, index) => {
                    console.log('item', item);
                    console.log('index', index);
                    // numberOfViolation[currentIndex] = item;
                    // setNumberOfViolation(numberOfViolation)

                    setMultiViolationValue(item, currentIndex)
                    onCloseList();
                }}
            />
        )
    }

    const setMultiViolationValue = (item, index) => {
        console.log('item', item);
        console.log('index', index);
        numberOfViolation[index] = item;
        setNumberOfViolation(numberOfViolation)
    }

    const getActiveCount = () => {
        let count = 0;
        if (ticketDetail.line_gauge_data.attorney_assigned == 1) {
            count = count + 1
        }

        if (ticketDetail.line_gauge_data.new_ticket == 1) {
            count = count + 1
        }

        if (ticketDetail.line_gauge_data.ticket_completed == 1) {
            count = 4
            return count
        }

        if (ticketDetail.line_gauge_data.ticket_followup == 1) {
            count = count + 1
        }
        console.log(" count ", count);
        return count
    }

    const defaultScrollViewProps = {
        keyboardShouldPersistTaps: 'handled',
        contentContainerStyle: {
            flex: 1,
            justifyContent: 'center'
        }
    };

    return (
        <BaseContainer
            {...props}
            title={props.route.params.isEdit ? "Edit ticket" : "Post a Ticket"}>
            {loading || isLoading ? <Loader /> : null}
            {renderPhotoSelection()}
            {console.log("subMemberList", subMemberList)}
            {masterData != null && masterData.violations != null ? renderDropDown() : null}
            <KeyboardAwareScrollView style={{ flex: 1, marginHorizontal: 15, marginTop: 20 }} contentContainerStyle={{ paddingBottom: 30 }} showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>
                {!isNext ?
                    <View>
                        {props.route.params.isEdit && ticketDetail != null ?
                            <View style={{ marginHorizontal: 0 }}>
                                <ProgressSteps activeStep={getActiveCount() == 4 ? 3 : getActiveCount()} labelFontSize={smartScale(9)} activeLabelFontSize={smartScale(9)}
                                    isComplete={getActiveCount() == 4 ? true : false}
                                    completedLabelColor={'#4BB543'}
                                    activeLabelColor={'lightgray'}
                                    activeStepIconBorderColor={'lightgray'}
                                >
                                    <ProgressStep label={"New Case Ticket"} removeBtnRow={true} isScrollable={true} scrollViewProps={defaultScrollViewProps} />
                                    <ProgressStep label="Attorney Assigned" removeBtnRow={true} isScrollable={true} scrollViewProps={defaultScrollViewProps} />
                                    <ProgressStep label="Case Ticket Followup" removeBtnRow={true} isScrollable={true} scrollViewProps={defaultScrollViewProps} />
                                    <ProgressStep label={ticketDetail.line_gauge_data.final_result} removeBtnRow={true} isScrollable={true} scrollViewProps={defaultScrollViewProps} />
                                </ProgressSteps>
                            </View> : null}
                        <Text style={{ fontSize: 13, fontFamily: fonts.REGULAR, fontWeight: '500', color: colors.text_light }}>{'Photo Upload of Ticket* '}</Text>
                        <View style={{ marginTop: 15, width: "90%", height: 120, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', zIndex: 998 }}>
                            <Image source={ticketPhoto != null ? { uri: ticketPhoto.uri } : Assets.PLACE_HOLDER} style={{ width: 100, height: 150, borderWidth: 0.5 }} resizeMode={'contain'} />
                            <TouchableOpacity style={{
                                position: 'absolute', backgroundColor: colors.white, width: 35, height: 35, borderRadius: 70,
                                bottom: -10, right: -10, justifyContent: 'center', alignItems: 'center', zIndex: 999, borderColor: colors.blue, borderWidth: 1
                            }} onPress={onTicketPhotoClick}>
                                <Image style={{ tintColor: colors.blue }} source={Assets.CAMERA} />
                            </TouchableOpacity>
                        </View>
                        <Text style={{ fontSize: 13, fontFamily: fonts.REGULAR, fontWeight: '500', color: colors.text_light, marginTop: 20 }}>{'Where did you get your ticket?*'}</Text>


                        {masterData != null ? <DropDownPicker
                            open={open}
                            value={value}
                            items={masterData.states}
                            setOpen={setOpen}
                            setValue={setValue}
                            onChangeValue={setStateValue}
                            listMode={'SCROLLVIEW'}
                            style={{ marginTop: 10, borderWidth: 1, borderColor: colors.border_color, borderRadius: 5, height: 40 }}
                            textStyle={{ fontFamily: fonts.REGULAR, fontSize: 13, color: colors.text_light, opacity: 0.7 }}
                            labelStyle={{ padding: 2, zIndex: 999 }}
                            zIndex={7000}
                            zIndexInvers={1000}
                        /> : null}

                        {city != null ? <Text style={{ fontSize: 13, fontFamily: fonts.REGULAR, fontWeight: '500', color: colors.text_light, marginTop: 20 }}>{'City'}</Text> : null}
                        {console.log(" valueCity ", valueCity)}
                        {console.log(" valueCity 111", value)}
                        {console.log(' valueCountry ', valueCountry)}
                        {city != null ? <DropDownPicker
                            open={openCity}
                            value={valueCity}
                            items={city.city}
                            setOpen={setOpenCity}
                            setValue={setValueCity}
                            onChangeValue={onCityChange}
                            // setItems={setCity}
                            listMode={'SCROLLVIEW'}
                            style={{ marginTop: 10, borderWidth: 1, borderColor: colors.border_color, borderRadius: 5, height: 40 }}
                            textStyle={{ fontFamily: fonts.REGULAR, fontSize: 13, color: colors.text_light, opacity: 0.7 }}
                            labelStyle={{ padding: 2 }}
                            zIndex={6000}
                            zIndexInvers={2000}

                        /> : null}

                        {user != null && user.show_sub_user_list && subMemberList != null ? <Text style={{ fontSize: 13, fontFamily: fonts.REGULAR, fontWeight: '500', color: colors.text_light, marginTop: 20 }}>{'Add family member'}</Text> : null}
                        {user != null && user.show_sub_user_list && subMemberList != null ? <DropDownPicker
                            open={openMember}
                            value={member}
                            items={subMemberList.member_list}
                            setOpen={setOpenMember}
                            setValue={setMember}
                            // onChangeValue={onMemberChange}
                            listMode={'SCROLLVIEW'}
                            style={{ marginTop: 10, borderWidth: 1, borderColor: colors.border_color, borderRadius: 5, height: 40 }}
                            textStyle={{ fontFamily: fonts.REGULAR, fontSize: 13, color: colors.text_light, opacity: 0.7 }}
                            labelStyle={{ padding: 2 }}
                            zIndex={5000}
                            zIndexInvers={3000}
                        /> : null}

                        <Text style={{ fontSize: 13, fontFamily: fonts.REGULAR, fontWeight: '500', color: colors.text_light, marginTop: 20 }}>{'Add multiple violations to one ticket*'}</Text>
                        <DropDownPicker
                            open={openViolations}
                            value={valueViolations}
                            items={violations}
                            setOpen={setOpenViolations}
                            setValue={setValueViolations}
                            setItems={setViolations}
                            onChangeValue={onViolationStatusChange}
                            listMode={'SCROLLVIEW'}
                            style={{ marginTop: 10, borderWidth: 1, borderColor: colors.border_color, borderRadius: 5, height: 40 }}
                            textStyle={{ fontFamily: fonts.REGULAR, fontSize: 13, color: colors.text_light, opacity: 0.7 }}
                            labelStyle={{ padding: 2 }}
                            zIndex={4000}
                            zIndexInvers={4000}

                        />

                        {isShowMultipleViolation ? <Text style={{ fontSize: 13, fontFamily: fonts.REGULAR, fontWeight: '500', color: colors.text_light, marginTop: 20 }}>{'Number of Violation Received'}</Text> : null}
                        {isShowMultipleViolation ? <DropDownPicker
                            open={openNumberViolations}
                            value={valueNumberViolations}
                            items={numberViolations}
                            setOpen={setOpenNumberViolations}
                            setValue={setValueNumberViolations}
                            setItems={setNumberViolations}
                            onChangeValue={onNumberViolationsChange}
                            listMode={'SCROLLVIEW'}
                            style={{ marginTop: 10, borderWidth: 1, borderColor: colors.border_color, borderRadius: 5, height: 40 }}
                            textStyle={{ fontFamily: fonts.REGULAR, fontSize: 13, color: colors.text_light, opacity: 0.7 }}
                            labelStyle={{ padding: 2 }}
                            zIndex={3000}
                            zIndexInvers={5000}
                        /> : null}

                        {console.log(" numberOfViolation ", numberOfViolation)}
                        {masterData != undefined ? <Text style={{ fontSize: 13, fontFamily: fonts.REGULAR, fontWeight: '500', color: colors.text_light, marginTop: 20 }}>{'Select the violations you received*'}</Text> : null}
                        {masterData != undefined && numberOfViolation != null && numberOfViolation.length > 0 != null ?
                            numberOfViolation.map((data, index) => {
                                return (
                                    // <DropDownPicker
                                    //     open={openSelectViolations[index]}
                                    //     value={valueSelectViolations[index]}
                                    //     items={masterData.violations}
                                    //     setOpen={setOpenSelectViolations[index]}
                                    //     setValue={setValueSelectViolations[index]}
                                    //     // setItems={setSelectViolations}
                                    //     listMode={'SCROLLVIEW'}
                                    //     style={{ marginTop: 10, borderWidth: 1, borderColor: colors.border_color, borderRadius: 5, height: 40 }}
                                    //     textStyle={{ fontFamily: fonts.REGULAR, fontSize: 13, color: colors.text_light, opacity: 0.7 }}
                                    //     labelStyle={{ padding: 2, zIndex: 990 }}
                                    //     zIndex={index * 1000}
                                    //     zIndexInvers={(numberOfViolation - index) * 1000}
                                    // />
                                    <TouchableOpacity style={{ padding: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, borderWidth: 1, borderColor: colors.border_color, borderRadius: 5, height: 40 }}
                                        onPress={() => {
                                            setCurrentIndex(index)
                                            setIsShowDropDown(true)
                                        }}>
                                        <Text style={{ flex: 1, fontFamily: fonts.REGULAR, fontSize: 13, color: colors.text_light, opacity: 0.7 }} numberOfLines={2}>{data != null ? data.value : 'Select an item'}</Text>

                                        <Image source={Assets.DROPDOWN} style={[{ width: 13, height: 13 }]} />
                                    </TouchableOpacity>
                                )
                            })
                            : null}

                        {/* {masterData != undefined && isShowMultipleViolation ? <DropDownPicker
                            open={openSelectViolations}
                            value={valueSelectViolations}
                            items={masterData.violations}
                            setOpen={setOpenSelectViolations}
                            setValue={setValueSelectViolations}
                            // setItems={setSelectViolations}
                            listMode={'SCROLLVIEW'}
                            style={{ marginTop: 10, borderWidth: 1, borderColor: colors.border_color, borderRadius: 5, height: 40 }}
                            textStyle={{ fontFamily: fonts.REGULAR, fontSize: 13, color: colors.text_light, opacity: 0.7 }}
                            labelStyle={{ padding: 2, zIndex: 990 }}
                            zIndex={1000}
                            zIndexInvers={5000}

                        /> : null
                        }
                        {masterData != undefined && isShowMultipleViolation ?
                            <DropDownPicker
                                open={openSelectViolations2}
                                value={valueSelectViolations2}
                                items={masterData.violations}
                                setOpen={setOpenSelectViolations2}
                                setValue={setValueSelectViolations2}
                                // setItems={setSelectViolations2}
                                listMode={'SCROLLVIEW'}
                                style={{ marginTop: 10, borderWidth: 1, borderColor: colors.border_color, borderRadius: 5, height: 40 }}
                                textStyle={{ fontFamily: fonts.REGULAR, fontSize: 13, color: colors.text_light, opacity: 0.7 }}
                                labelStyle={{ padding: 2 }}
                                zIndex={500}
                                zIndexInvers={6000}


                            />
                            : null
                        } */}
                        <Text style={{ fontSize: 13, fontFamily: fonts.REGULAR, fontWeight: '500', color: colors.text_light, marginTop: 20 }}>{'When did you get your ticket*'}</Text>
                        <TouchableOpacity style={{ padding: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, borderWidth: 1, borderColor: colors.border_color, borderRadius: 5, height: 40 }} onPress={() => setOpenDate(true)}>
                            <Text style={{ fontFamily: fonts.REGULAR, fontSize: 13, color: colors.text_light, opacity: 0.7 }}>{moment(valueTicket).format('DD/MM/YYYY')}</Text>

                            <Image source={Assets.DATE_PICKER} style={[{ width: 13, height: 13, tintColor: colors.blue }]} />
                        </TouchableOpacity>

                        <DatePicker
                            modal
                            mode={'date'}
                            open={openDate}
                            date={valueTicket}
                            maximumDate={new Date()}
                            onConfirm={(date) => {
                                setOpenDate(false)
                                // setDate(date)
                                setValueTicket(date)
                            }}
                            onCancel={() => {
                                setOpenDate(false)
                            }}
                        />

                        <TouchableOpacity style={{
                            width: 170, alignSelf: 'center', marginHorizontal: 30, marginTop: 20, flexDirection: 'row', justifyContent: 'center',
                            alignItems: 'center', padding: 10, backgroundColor: colors.blue, borderRadius: 4
                        }} onPress={() => { setIsNext(true) }}>
                            <Text style={{ fontFamily: fonts.REGULAR, fontSize: 20, color: colors.white, marginHorizontal: 20 }}>{'Next'}</Text>
                        </TouchableOpacity>
                    </View>
                    :
                    <View>
                        <Text style={{ fontSize: 13, fontFamily: fonts.REGULAR, fontWeight: '500', color: colors.text_light }}>{'Ticket already have a court date scheduled*'}</Text>
                        <DropDownPicker
                            open={openTicketScheduled}
                            value={valueTicketScheduled}
                            items={ticketScheduled}
                            setOpen={setOpenTicketScheduled}
                            setValue={setValueTicketScheduled}
                            setItems={setSelectTicketScheduled}
                            onChangeValue={onTicketSchedule}
                            listMode={'SCROLLVIEW'}
                            style={{ marginTop: 10, borderWidth: 1, borderColor: colors.border_color, borderRadius: 5, height: 40 }}
                            textStyle={{ fontFamily: fonts.REGULAR, fontSize: 13, color: colors.text_light, opacity: 0.7 }}
                            labelStyle={{ padding: 2, zIndex: 999 }}
                        />

                        {isCourtSchedule ? <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity style={{ flex: 1, flexDirection: 'row', marginTop: 10, borderWidth: 1, borderColor: colors.border_color, borderRadius: 5, height: 40, alignItems: 'center', paddingHorizontal: 10, marginRight: 15 }}
                                onPress={() => { setOpenCourtDate(true) }}
                            >
                                <Text style={{ flex: 1, fontFamily: fonts.REGULAR, fontWeight: '400', fontSize: 13, color: colors.text_light }}>{moment(courtDate).format('DD/MM/YYYY')}</Text>
                                <Image style={{ tintColor: colors.blue }} source={Assets.DATE_PICKER} />
                            </TouchableOpacity>

                            <TouchableOpacity style={{ flex: 1, marginTop: 10, borderWidth: 1, borderColor: colors.border_color, borderRadius: 5, height: 40, justifyContent: 'center', paddingHorizontal: 10, }}
                                onPress={() => { setOpenCourtTime(true) }}
                            >
                                <Text style={{ fontFamily: fonts.REGULAR, fontWeight: '400', fontSize: 13, color: colors.text_light }}>{moment(courtTime).format('HH:mm')}</Text>
                            </TouchableOpacity>
                        </View> : null}

                        {isCourtSchedule ? <DatePicker
                            modal
                            mode={'date'}
                            open={openCourtDate}
                            date={courtDate}
                            onConfirm={(date) => {
                                setOpenCourtDate(false)
                                setCourtDate(date)
                            }}
                            // maximumDate={new Date()}
                            minimumDate={new Date()}
                            onCancel={() => {
                                setOpenCourtDate(false)
                            }}
                        /> : null}
                        {isCourtSchedule ? console.log(" courtTime ", courtTime) : null}

                        {isCourtSchedule ? <DateTimePickerModal
                            isVisible={openCourtTime}
                            mode='time'
                            locale="en_GB"
                            date={courtTime}
                            onConfirm={(date) => {
                                console.log(" CHECK DATA ", date);
                                setOpenCourtTime(false)
                                setCourtTime(date)
                            }}
                            onCancel={() => {
                                setOpenCourtTime(false)
                            }}
                        /> : null}
                        {/* <DatePicker
                            modal
                            mode={'time'}
                            open={openCourtTime}
                            locale="en_GB"
                            date={new Date()}
                            onConfirm={(date) => {
                                console.log(" CHECK DATA ", date);
                                setOpenCourtTime(false)
                                setCourtTime(date)
                            }}
                            onCancel={() => {
                                setOpenCourtTime(false)
                            }}
                        /> */}

                        {court != null ? <Text style={{ fontSize: 13, fontFamily: fonts.REGULAR, fontWeight: '500', color: colors.text_light, marginTop: 20 }}>{'Which court is your ticket assigned to*'}</Text> : null}
                        {court != null ? <DropDownPicker
                            open={openCountry}
                            value={valueCountry}
                            items={court.court}
                            setOpen={setOpenCountry}
                            setValue={setValueCountry}
                            // setItems={setSelectCountry}
                            listMode={'SCROLLVIEW'}
                            style={{ marginTop: 10, borderWidth: 1, borderColor: colors.border_color, borderRadius: 5, height: 40 }}
                            textStyle={{ fontFamily: fonts.REGULAR, fontSize: 13, color: colors.text_light, opacity: 0.7 }}
                            labelStyle={{ padding: 2 }}
                            zIndex={1000}
                        /> : null}

                        <Text style={{ fontSize: 13, fontFamily: fonts.REGULAR, fontWeight: '500', color: colors.text_light, marginTop: 20 }}>{'Was there an accident involved. If yes, Please fill in details and post an image'}</Text>
                        {/* <View style={{ marginTop: 15, width: 100, height: 100, borderRadius: 200, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', borderWidth: 10, zIndex: 998 }}>
                            <Image source={{ uri: accidentPhoto != null ? accidentPhoto.uri : "https://picsum.photos/200/300" }} style={{ width: 100, height: 100, borderRadius: 200, }} resizeMode={'cover'} /> */}
                        <View style={{ marginTop: 15, width: "90%", height: 120, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', zIndex: 998 }}>
                            <Image source={accidentPhoto != null ? { uri: accidentPhoto.uri } : Assets.PLACE_HOLDER} style={{ width: 100, height: 150, borderWidth: 1 }} resizeMode={"contain"} />
                            <TouchableOpacity style={{
                                position: 'absolute', backgroundColor: colors.white, width: 35, height: 35, borderRadius: 70,
                                bottom: -10, right: -10, justifyContent: 'center', alignItems: 'center', zIndex: 999, borderColor: colors.blue, borderWidth: 1
                            }} onPress={onAccidentPhotoClick}>
                                <Image style={{ tintColor: colors.blue }} source={Assets.CAMERA} />
                            </TouchableOpacity>
                        </View>

                        <TextInput
                            style={{
                                fontSize: 13, padding: 10, fontFamily: fonts.REGULAR, borderWidth: 1, borderColor: colors.border_color, borderRadius: 5,
                                height: 90, textAlignVertical: 'top', textAlign: 'left', color: colors.text_light, marginTop: 20
                            }}
                            multiline={true}
                            value={accidentDetail}
                            onChangeText={onAccidentDetailChange}
                            placeholder={'Detail and information of accident'}
                        />


                        <Text style={{ fontSize: 13, fontFamily: fonts.REGULAR, fontWeight: '500', color: colors.text_light, marginTop: 20 }}>{'Upload to attachment audio and video'}</Text>

                        <TouchableOpacity style={{ flexDirection: 'row', padding: 10, marginTop: 20, backgroundColor: colors.blue, alignSelf: 'flex-start', alignItems: 'center' }} onPress={onAttachment}>
                            <Image source={Assets.SHARE} />
                            <Text style={{ fontFamily: fonts.REGULAR, fontWeight: 'bold', color: colors.white, marginLeft: 10 }}>{"Attached File"}</Text>
                        </TouchableOpacity>

                        {attachment != null ?
                            attachment.map((data, index) => {
                                return (
                                    <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                                        <Image source={Assets.PLAY} />
                                        <View style={{ marginLeft: 10 }}>
                                            <Text style={{ fontSize: 12, fontFamily: fonts.REGULAR, color: colors.black }}>{data.name}</Text>
                                            <Text style={{ fontSize: 10, fontFamily: fonts.REGULAR, color: colors.black }}>{String(parseInt((data.size) / 1000)) + ' kb'}</Text>
                                        </View>
                                    </View>
                                )
                            })
                            : null}

                        <View style={{ flexDirection: 'row', paddingHorizontal: 2, marginTop: 20 }}>
                            <TouchableOpacity style={{
                                flex: 1, marginTop: 20, flexDirection: 'row', justifyContent: 'center',
                                alignItems: 'center', padding: 10, backgroundColor: colors.white, borderRadius: 4,
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 1 },
                                shadowOpacity: 0.5,
                                shadowRadius: 1,
                                elevation: 3,
                                marginRight: 5,
                            }} onPress={() => { setIsNext(false) }}>
                                <Text style={{ fontFamily: fonts.REGULAR, fontSize: 20, color: colors.black, marginHorizontal: 20 }}>{'Back'}</Text>
                            </TouchableOpacity>

                            {(ticketDetail != null ? ticketDetail.line_gauge_data.ticket_completed == 0 : ticketDetail == null) ? <TouchableOpacity style={{
                                flex: 1, marginTop: 20, flexDirection: 'row', justifyContent: 'center',
                                alignItems: 'center', padding: 10, backgroundColor: colors.blue, borderRadius: 4, marginLeft: 5
                            }} onPress={onSubmit}>
                                <Text style={{ fontFamily: fonts.REGULAR, fontSize: 20, color: colors.white, marginHorizontal: 20 }}>{'Submit'}</Text>
                            </TouchableOpacity> : null}
                        </View>
                    </View>
                }
            </KeyboardAwareScrollView>
        </BaseContainer>
    )
}

export default PostTicket
