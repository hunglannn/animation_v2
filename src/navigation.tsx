import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from './Home';
import {Lesson1} from './Lesson1';
import {Lesson2} from './Lesson2';
import {Lesson3} from './Lesson3';
import {Lesson5} from './Lesson5';
import {Lesson8} from './Lesson8';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={SCREENS.HOME} component={Home} />
        <Stack.Screen name={SCREENS.LESSON_1} component={Lesson1} />
        <Stack.Screen name={SCREENS.LESSON_2} component={Lesson2} />
        <Stack.Screen name={SCREENS.LESSON_3} component={Lesson3} />
        <Stack.Screen name={SCREENS.LESSON_5} component={Lesson5} />
        <Stack.Screen name={SCREENS.LESSON_8} component={Lesson8} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;

const SCREENS = {
  HOME: 'HOME',

  LESSON_1: 'LESSON_1',
  LESSON_2: 'LESSON_2',
  LESSON_3: 'LESSON_3',
  LESSON_5: 'LESSON_5',
  LESSON_8: 'LESSON_8',
};
