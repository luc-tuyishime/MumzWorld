// import React from 'react'
// import { StatusBar } from 'expo-status-bar';
// import { Text, View } from 'react-native';
//
//
//
// export default function App() {
//   return (
//     <View className='flex-1 items-center justify-center'>
//       <Text className='text-1xl text-cyan-600 text-center p-4'>Open up App.tsx to start working on your app......</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }


import React from 'react';
import "./global.css"
import { Provider } from 'react-redux';
import { store } from './src/store';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
    return (
        <Provider store={store}>
                <AppNavigator />
        </Provider>
    );
}
