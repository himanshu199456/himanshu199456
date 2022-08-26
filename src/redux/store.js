import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import LoginReducer from '../container/Login/reducer';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import SignupReducer from '../container/SignUp/reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import ChangePasswordReducer from '../container/ChangePassword/reducer';
import ForgotPasswordReducer from '../container/ForgotPassword/reducer';
import OTPVerifyReducer from '../container/OTPVerification/reducer';
import AccountSettingReducer from '../container/AccountSetting/reducer';
import TicketReducer from '../container/PostTicket/reducers';
import EditProfileReducer from '../container/Profile/reducers';
import SupportRequestReducer from '../container/SupportRequest/reducer';
import ViewTicketReducer from '../container/ViewTickets/reducer';
import SubscriptionReducer from '../container/Subscription/reducer';
import NewRequestReducer from '../container/NewRequest/reducer';
import ChatReducer from '../container/Chat/reducers';
import ReferReducer from '../container/ReferFriend/reducers';
import NotificationReducer from '../container/NotificationList/reducer';
import SupportDetailReducer from '../container/SupportRequestDetail/reducer';
import PaymentReducer from '../container/Payment/reducers';
import PaymentHistoryReducer from '../container/TransactionHistory/reducer';
import TermsConditionReducer from '../container/TermsAndCondition/reducer';
import HomeReducer from '../container/Home/reducer';
import AddMemberReducer from '../container/AddMember/reducer';

const sagaMiddleware = createSagaMiddleware();
/**
 * this app uses React Native Debugger, but it works without it
 */

const combinedReducers = combineReducers({
  Login: LoginReducer,
  Signup: SignupReducer,
  ChangePassword: ChangePasswordReducer,
  ForgotPassword: ForgotPasswordReducer,
  OTPVerifyReducer: OTPVerifyReducer,
  TicketReducer: TicketReducer,
  EditProfile: EditProfileReducer,
  SupportRequest: SupportRequestReducer,
  ViewTicket: ViewTicketReducer,
  Subscription: SubscriptionReducer,
  NewRequest: NewRequestReducer,
  Chat: ChatReducer,
  Refer: ReferReducer,
  Notification: NotificationReducer,
  SupportDetail: SupportDetailReducer,
  Payment: PaymentReducer,
  PaymentHistory: PaymentHistoryReducer,
  TermsCondition: TermsConditionReducer,
  Home:HomeReducer,
  AddMember:AddMemberReducer,
});

const rootReducers = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    return combinedReducers(undefined, action)
  }

  return combinedReducers(state, action)
}

const composeEnhancers = compose;
const middlewares = [sagaMiddleware];

const store = createStore(rootReducers, composeWithDevTools(composeEnhancers(applyMiddleware(...middlewares))),);

sagaMiddleware.run(rootSaga);

export { store };