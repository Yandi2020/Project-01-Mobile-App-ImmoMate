import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import AppNavigator from './app/navigation/AppNavigator';
import navigationTheme from './app/navigation/navigationTheme'
import WelcomeScreen from './app/screens/WelcomeScreen'
import rootReducer from './app/reducers/rootReducer'
import AuthContextProvider from './app/context/AuthContext'

export default function App() {
  const store = createStore(rootReducer);
  const [welcome, setWelcome] = useState(true);

  useEffect(() =>{
    setTimeout(() => {
      setWelcome(false);
    }, 2500);
  }, []);

  return (
    welcome ? (
      <WelcomeScreen />
    ): (
      <AuthContextProvider>
        <Provider store={store} >
          <NavigationContainer theme={navigationTheme}>
            <AppNavigator />
          </NavigationContainer>
        </Provider>
      </AuthContextProvider>
    )
  )
}





