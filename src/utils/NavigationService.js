// NavigationService.js

import { CommonActions } from '@react-navigation/native';

var _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function getNavigation() {
  return _navigator
}

function navigate(routeName, params) {
  console.log('createRef', _navigator.dispatch);
  _navigator.dispatch(
    CommonActions.navigate({
      name: routeName,
      params: params,
    }),
  );
}

function navigateAndReset(routeName) {
  console.log('createRef', _navigator.dispatch);
  _navigator.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: routeName }],
    })
  );
}

function getCurrentRoute() {
  console.log('createRef', _navigator);
  return _navigator.state.nav.index;
}

export default {
  navigate,
  navigateAndReset,
  setTopLevelNavigator,
  getCurrentRoute,
};

// import {createNavigationContainerRef} from '@react-navigation/native';

// export const navigationRef = createNavigationContainerRef();

// export function navigate(name, params) {
//   if (navigationRef.isReady()) {
//     navigationRef.navigate(name, params);
//   }
// }
