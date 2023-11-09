import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Animated, {
  Extrapolate,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

interface PageProps {
  title: string;
  index: number;
  translateX: SharedValue<number>;
}
const {height, width} = Dimensions.get('window');
const SIZE = width * 0.7;

const PageLesson3 = (props: PageProps) => {
  const {title, index, translateX} = props;
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

  const rStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      inputRange,
      [0, 1, 0],
      Extrapolate.CLAMP,
    );
    const borderRadius = interpolate(
      translateX.value,
      inputRange,
      [0, SIZE / 2, 0],
      Extrapolate.CLAMP,
    );

    return {
      transform: [{scale}],
      borderRadius,
    };
  });

  const rTextStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      translateX.value,
      inputRange,
      [height / 2, 0, -height / 2],
      Extrapolate.CLAMP,
    );
    const opacity = interpolate(
      translateX.value,
      inputRange,
      [-2, 1, -2],
      Extrapolate.CLAMP,
    );
    return {
      transform: [{translateY}],
      opacity,
    };
  });

  const translateY = interpolate(
    translateX.value,
    [(index - 1) * width, index * width, (index + 1) * width],
    [0, SIZE, 0],
  );

  return (
    <View
      style={[
        styles.pageContainer,
        {backgroundColor: `rgba(0,0, 256,0.${index + 2} )`},
      ]}>
      <Animated.View style={[styles.square, rStyle]} />
      <Animated.View style={[{position: 'absolute'}, rTextStyle]}>
        <Text style={[styles.title]}>{title}</Text>
      </Animated.View>
    </View>
  );
};

export default PageLesson3;

const styles = StyleSheet.create({
  pageContainer: {
    height,
    width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  square: {
    height: SIZE,
    width: SIZE,
    backgroundColor: `rgba(255,255,255,0.4)`,
  },
  title: {
    fontSize: 72,
    color: 'white',
  },
});
