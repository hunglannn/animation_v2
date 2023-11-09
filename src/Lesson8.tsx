import {StyleSheet, View, Image, Dimensions, ColorValue} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
  SharedValue,
  useAnimatedGestureHandler,
  withTiming,
} from 'react-native-reanimated';
import {
  PinchGestureHandler,
  PinchGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import ColorPicker from './components/ColorPicker';

const COLORS = [
  'red',
  'purple',
  'blue',
  'cyan',
  'green',
  'yellow',
  'orange',
  'black',
  'white',
];
const BACKGROUND_COLOR = 'rgba(0, 0, 0,0.9)';
const width = Dimensions.get('window').width;

const PICKER_WIDTH = width * 0.9;
const CIRCLE_SIZE = width * 0.7;

export const Lesson8 = () => {
  const pickerColor = useSharedValue<string | number>(COLORS[0]);
  const rStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: pickerColor.value as ColorValue,
    };
  });

  const onColorChange = useCallback((color: string | number) => {
    'worklet';

    pickerColor.value = color;
  }, []);

  return (
    <>
      <View style={styles.topContainer}>
        <Animated.View style={[styles.circle, rStyle]} />
      </View>

      <View style={styles.bottomContainer}>
        <ColorPicker
          colors={COLORS}
          end={{x: 1, y: 0}}
          start={{x: 0, y: 0}}
          style={styles.gradient}
          maxWidth={PICKER_WIDTH}
          onColorChange={onColorChange}
        />
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  topContainer: {
    flex: 3,
    alignItems: 'center',
    backgroundColor: BACKGROUND_COLOR,
    justifyContent: 'center',
  },
  bottomContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BACKGROUND_COLOR,
  },
  gradient: {
    width: PICKER_WIDTH,
    height: 40,
    borderRadius: 20,
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE,
  },
});
