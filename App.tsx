import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from './src/screens/SplashScreen';
import HomeScreen from './src/screens/HomeScreen';
import NewsDetailsScreen from './src/screens/NewsDetailsScreen';
import {Provider} from 'react-redux';
import {LogBox} from 'react-native';
import store, {persistor} from './src/redux';
import {PersistGate} from 'redux-persist/integration/react';
LogBox.ignoreAllLogs();

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Splash"
            screenOptions={{headerShown: false}}>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen
              name="HomeScreen"
              component={HomeScreen}
              options={{title: 'News Screen'}}
            />
            <Stack.Screen
              name="NewsDetailsScreen"
              component={NewsDetailsScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;
