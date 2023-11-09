import {StyleSheet} from 'react-native';
import React from 'react';
import AppNavigation from './src/navigation';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <AppNavigation />
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({});
