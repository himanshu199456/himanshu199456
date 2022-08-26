/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from '../../navigator/index';
import { store } from '../../redux/store';
import stripe from "tipsi-stripe";
import NavigationService from '../../utils/NavigationService';


// stripe.setOptions({
//     publishableKey: 'pk_test_51Jl609HlinOnEri01vJjXXzcaQWfdHM3f9V4TvjQI2CBHahJOFh8EMSZ7rPdtwrW58PUdDSRBig15PgBJxVtFJOB004VohDiil',
//     merchantId: 'sk_test_51Jl609HlinOnEri05Mh0fIKEPF2iIh4NeEBUGkGeFynPszpLZjBtVqtDrfyX1PqS7yIdCJacFwXEG6cQ4GYRb2Gc00uNz60tNY',
//     androidPayMode: 'test'
//   })

const App = () => {
    return (
        <SafeAreaProvider>
            <NavigationContainer ref={navRef => NavigationService.setTopLevelNavigator(navRef)}>
                <AppNavigator />
            </NavigationContainer>
        </SafeAreaProvider>
    )
};

export default () => (
    <ReduxProvider store={store}>
        <App />
    </ReduxProvider>
);

// const AppInit = () => (
//     <ReduxProvider store={store}>
//         <App />
//     </ReduxProvider>
// );

// export default withIAPContext(AppInit)
