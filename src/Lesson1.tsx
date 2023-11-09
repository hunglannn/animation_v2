import {StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
  SharedValue,
} from 'react-native-reanimated';
import {DefaultStyle} from 'react-native-reanimated/lib/typescript/reanimated2/hook/commonTypes';

const SIZE = 100;

const handleRotation = (progress: SharedValue<number>) => {
  'worklet';
  return `${progress.value * 2 * Math.PI}rad`;
};

export const Lesson1 = () => {
  const progress = useSharedValue(1);
  const scale = useSharedValue(2);

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
      borderRadius: (progress.value * SIZE) / 2,
      transform: [{scale: scale.value}, {rotate: handleRotation(progress)}],
    } as DefaultStyle;
  }, []);

  useEffect(() => {
    progress.value = withRepeat(withSpring(0.5), -1, true);
    scale.value = withRepeat(withSpring(1), -1, true);
  }, []);

  return (
    <View style={styles.wrapper}>
      <Animated.View
        style={[
          {height: SIZE, width: SIZE, backgroundColor: 'blue'},
          reanimatedStyle,
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
