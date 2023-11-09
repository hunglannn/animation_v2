import {StyleSheet, View, Image, Dimensions} from 'react-native';
import React, {useEffect} from 'react';
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

const urlImage = 'https://picsum.photos/375/812';
const {width, height} = Dimensions.get('window');

const AnimatedImage = Animated.createAnimatedComponent(Image);

export const Lesson5 = () => {
  const scale = useSharedValue(1);
  const focalX = useSharedValue(0);
  const focalY = useSharedValue(0);

  const pinchGesture =
    useAnimatedGestureHandler<PinchGestureHandlerGestureEvent>({
      onActive: event => {
        scale.value = event.scale;
        focalX.value = event.focalX;
        focalY.value = event.focalY;
      },
      onEnd: () => {
        scale.value = withTiming(1);
      },
    });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: focalX.value},
        {translateY: focalY.value},
        {translateX: -width / 2},
        {translateY: -height / 2},
        {scale: scale.value},
        {translateX: -focalX.value},
        {translateY: -focalY.value},
        {translateX: width / 2},
        {translateY: height / 2},
      ],
    };
  });
  // const focalPointStyle = useAnimatedStyle(() => {
  //   return {
  //     transform: [{translateX: focalX.value}, {translateY: focalY.value}],
  //   };
  // });

  return (
    <PinchGestureHandler onGestureEvent={pinchGesture}>
      <Animated.View style={{flex: 1}}>
        <AnimatedImage source={{uri: urlImage}} style={[{flex: 1}, rStyle]} />
        {/* <Animated.View style={[styles.focalPoint, focalPointStyle]} /> */}
      </Animated.View>
    </PinchGestureHandler>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  focalPoint: {
    ...StyleSheet.absoluteFillObject,
    width: 20,
    height: 20,
    backgroundColor: 'blue',
    borderRadius: 10,
  },
});
