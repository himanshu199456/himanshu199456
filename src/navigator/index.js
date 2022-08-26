/**
 * App Navigator
 * */


import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Login from "../container/Login";
import Splash from "../container/Splash";
import ForgotPassword from "../container/ForgotPassword";
import SignUp from "../container/SignUp";
import ChangePassword from "../container/ChangePassword";
import Home from "../container/Home";
import MobileOTP from "../container/MobileOTP";
import OTPVerification from "../container/OTPVerification";
import ViewTickets from "../container/ViewTickets";
import Intro from "../container/Intro";
import Subscription from "../container/Subscription";
import PostTicket from "../container/PostTicket";
import SupportRequest from "../container/SupportRequest";
import CustomDrawerContent from "../component/CustomDrawerContent";
import Profile from "../container/Profile";
import AccountSetting from "../container/AccountSetting";
import ReferFriend from "../container/ReferFriend";
import Chat from "../container/Chat";
import SupportTicket from "../container/SupportTicket";
import RecordingScreen from "../container/RecordingScreen";
import SupportRequestDetail from "../container/SupportRequestDetail";
import RecordPlayer from "../container/RecordPlayer";
import TrackList from "../container/TrackList";
import RatingDetail from "../container/RatingDetail";
import NewRequest from "../container/NewRequest";
import Payment from "../container/Payment";
import NotificationList from "../container/NotificationList";
import TransactionHistory from "../container/TransactionHistory";
import VideoPlayer from "../container/VideoPlayer";
import VideoRecord from "../container/VideoRecord";
import TermsAndCondition from "../container/TermsAndCondition";
import VideoList from "../container/VideoList";
import AddMember from "../container/AddMember";
import VideoShow from "../container/VideoShow";
// import DrawerNavigator from "./bottomNavigator";


const DrawerNavigator = () => {
    const Drawer = createDrawerNavigator();

    return (
        <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
            <Drawer.Screen name='Home' component={Home} />
            <Drawer.Screen name='SupportRequest' component={SupportRequest} />
            <Drawer.Screen name='Profile' component={Profile} />
            <Drawer.Screen name='AccountSetting' component={AccountSetting} />
            <Drawer.Screen name='ReferFriend' component={ReferFriend} />
            <Drawer.Screen name='Chat' component={Chat} />
            <Drawer.Screen name='SupportTicket' component={SupportTicket} />
            <Drawer.Screen name='SupportRequestDetail' component={SupportRequestDetail} />
            <Drawer.Screen name='RecordingScreen' component={RecordingScreen} />
            <Drawer.Screen name='RecordPlayer' component={RecordPlayer} />
            <Drawer.Screen name='VideoPlayer' component={VideoPlayer} />
            <Drawer.Screen name='TrackList' component={TrackList} />
            <Drawer.Screen name='VideoList' component={VideoList} />
            <Drawer.Screen name='RatingDetail' component={RatingDetail} />
            <Drawer.Screen name='NewRequest' component={NewRequest} />
            {/* <Drawer.Screen name='Subscription' component={Subscription} /> */}
            <Drawer.Screen name='Payment' component={Payment} />
            <Drawer.Screen name='NotificationList' component={NotificationList} />
            <Drawer.Screen name='TransactionHistory' component={TransactionHistory} />
            <Drawer.Screen name='PostTicket' component={PostTicket} />
            <Drawer.Screen name='ViewTickets' component={ViewTickets} />
            <Drawer.Screen name='VideoRecord' component={VideoRecord} />
            <Drawer.Screen name='AddMember' component={AddMember} />
            <Drawer.Screen name='VideoShow' component={VideoShow} />

        </Drawer.Navigator>
    )
};

const AppNavigator = () => {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator headerMode="none" initialRouteName={'Intro'}>
            <Stack.Screen name='Splash' component={Splash} />
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='SignUp' component={SignUp} />
            <Stack.Screen name='ForgotPassword' component={ForgotPassword} />
            <Stack.Screen name='ChangePassword' component={ChangePassword} />
            <Stack.Screen name='Home' component={DrawerNavigator} />
            <Stack.Screen name='MobileOTP' component={MobileOTP} />
            <Stack.Screen name='OTPVerification' component={OTPVerification} />
            <Stack.Screen name='ViewTickets' component={ViewTickets} />
            <Stack.Screen name='Intro' component={Intro} />
            <Stack.Screen name='PostTicket' component={PostTicket} />
            <Stack.Screen name='Subscription' component={Subscription} />
            <Stack.Screen name='Payment' component={Payment} />
            <Stack.Screen name='TransactionHistory' component={TransactionHistory} />
            <Stack.Screen name='TermsAndCondition' component={TermsAndCondition} />
            <Stack.Screen name='NotificationList' component={NotificationList} />
            <Stack.Screen name='Profile' component={Profile} />
            {/* <Stack.Screen name='Subscription' component={Subscription} />
            <Stack.Screen name='Payment' component={Payment} /> */}
            {/* <Stack.Screen name='SupportRequest' component={SupportRequest} /> */}

        </Stack.Navigator>
    )
};

export default AppNavigator;
