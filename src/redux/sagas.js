import { fork } from 'redux-saga/effects';
import accountSettingSaga from '../container/AccountSetting/saga';
import addMemberSaga from '../container/AddMember/saga';
import changePasswordSaga from '../container/ChangePassword/saga';
import chatScreenSaga from '../container/Chat/saga';
import forgotPasswordSaga from '../container/ForgotPassword/saga';
import homeScreenSaga from '../container/Home/saga';
import loginScreenSaga from '../container/Login/saga';
import newRequestScreenSaga from '../container/NewRequest/saga';
import notificationScreenSaga from '../container/NotificationList/saga';
import otpVerifyScreenSaga from '../container/OTPVerification/saga';
import paymentScreenSaga from '../container/Payment/saga';
import ticketScreenSaga from '../container/PostTicket/saga';
import editProfileScreenSaga from '../container/Profile/saga';
import referScreenSaga from '../container/ReferFriend/saga';
import registerScreenSaga from '../container/SignUp/saga';
import subscriptionScreenSaga from '../container/Subscription/saga';
import supportRequestScreenSaga from '../container/SupportRequest/saga';
import supportDetailScreenSaga from '../container/SupportRequestDetail/saga';
import termsConditionScreenSaga from '../container/TermsAndCondition/saga';
import paymentHistoryScreenSaga from '../container/TransactionHistory/saga';
import viewTicketScreenSaga from '../container/ViewTickets/saga';

function* rootSaga() {
    yield fork(loginScreenSaga);
    yield fork(registerScreenSaga)
    yield fork(changePasswordSaga)
    yield fork(forgotPasswordSaga)
    yield fork(otpVerifyScreenSaga)
    yield fork(ticketScreenSaga)
    yield fork(editProfileScreenSaga)
    yield fork(supportRequestScreenSaga)
    yield fork(viewTicketScreenSaga)
    yield fork(subscriptionScreenSaga)
    yield fork(newRequestScreenSaga)
    yield fork(chatScreenSaga)
    yield fork(referScreenSaga)
    yield fork(notificationScreenSaga)
    yield fork(supportDetailScreenSaga)
    yield fork(paymentScreenSaga)
    yield fork(paymentHistoryScreenSaga)
    yield fork(termsConditionScreenSaga)
    yield fork(homeScreenSaga)
    yield fork(addMemberSaga)
}

export default rootSaga;