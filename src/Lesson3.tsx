import {StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
  SharedValue,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import PageLesson3 from './components/PageLesson3';

const WORDS = ["What 's", 'up', 'mobile', 'dev'];

export const Lesson3 = () => {
  const translateX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler(event => {
    translateX.value = event.contentOffset.x;
  });

  return (
    <Animated.ScrollView
      horizontal
      pagingEnabled
      scrollEventThrottle={16}
      style={styles.wrapper}
      onScroll={scrollHandler}>
      {WORDS.map((e, i) => {
        return (
          <PageLesson3 key={i} index={i} title={e} translateX={translateX} />
        );
      })}
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});
