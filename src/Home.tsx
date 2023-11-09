import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const LIST_SCREENS = [
  'LESSON_1',
  'LESSON_2',
  'LESSON_3',
  'LESSON_5',
  'LESSON_8',
];

const Home = ({navigation}: any) => {
  return (
    <View>
      {LIST_SCREENS.map((e, i) => {
        return (
          <TouchableOpacity
            key={i}
            onPress={() => navigation.navigate(e)}
            style={{
              padding: 12,
              backgroundColor: 'white',
              borderBottomWidth: 1,
              borderColor: '#ccc',
            }}>
            <Text>{e}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
