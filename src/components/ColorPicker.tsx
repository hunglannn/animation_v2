import {Dimensions, StyleProp, StyleSheet, ViewStyle} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  TapGestureHandler,
  TapGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  interpolateColor,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

interface ColorsPickerProps {
  colors: string[];
  style: StyleProp<ViewStyle>;
  start: any;
  end: any;
  maxWidth: number;
  onColorChange: (color: string | number) => void;
}
const PICKER_CIRCLE = 45;
const INTERNAL_PICKER_CIRCLE = PICKER_CIRCLE / 2;

const ColorPicker = (props: ColorsPickerProps) => {
  const {colors, style, start, end, maxWidth, onColorChange} = props;

  const scale = useSharedValue(0);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const adjustedTranslateX = useDerivedValue(() => {
    return Math.min(Math.max(translateX.value, 0), maxWidth - PICKER_CIRCLE);
  });

  const panGestureEVent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {x: number}
  >({
    onStart: (_, context) => {
      context.x = adjustedTranslateX.value;
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.x;
    },
    onEnd: event => {
      translateY.value = withTiming(0);
      scale.value = withSpring(1);
    },
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: adjustedTranslateX.value},
        {translateY: translateY.value},
        {scale: scale.value},
      ],
    };
  });

  const rInternalStyle = useAnimatedStyle(() => {
    const inputRange = colors.map(
      (_, index) => (index / colors.length) * maxWidth,
    );
    const backgroundColor = interpolateColor(
      translateX.value,
      inputRange,
      colors,
    );
    onColorChange?.(backgroundColor);
    return {backgroundColor};
  });

  const tapGestureEvent =
    useAnimatedGestureHandler<TapGestureHandlerGestureEvent>({
      onStart: event => {
        translateY.value = withSpring(-PICKER_CIRCLE);
        scale.value = withSpring(1.2);
        translateX.value = withTiming(event.absoluteX - PICKER_CIRCLE);
      },
      onEnd: () => {
        translateY.value = withTiming(0);
        scale.value = withSpring(1);
      },
    });

  return (
    <TapGestureHandler onGestureEvent={tapGestureEvent}>
      <Animated.View>
        <PanGestureHandler onGestureEvent={panGestureEVent}>
          <Animated.View style={{justifyContent: 'center'}}>
            <LinearGradient
              colors={colors}
              style={style}
              start={start}
              end={end}
            />
            <Animated.View style={[styles.picker, rStyle]}>
              <Animated.View style={[styles.internalPicker, rInternalStyle]} />
            </Animated.View>
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
    </TapGestureHandler>
  );
};

export default ColorPicker;

const styles = StyleSheet.create({
  picker: {
    position: 'absolute',
    backgroundColor: 'white',
    width: PICKER_CIRCLE,
    height: PICKER_CIRCLE,
    borderRadius: PICKER_CIRCLE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  internalPicker: {
    position: 'absolute',
    backgroundColor: 'red',
    width: INTERNAL_PICKER_CIRCLE,
    height: INTERNAL_PICKER_CIRCLE,
    borderRadius: INTERNAL_PICKER_CIRCLE,
    borderColor: 'rgba(0,0,0,0.2)',
    borderWidth: 1,
  },
});
