import * as React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { fontSize, spacing, palette } from '../../utils/baseStyles';

export const Countdown = (props) => {
  const {
    minutes,
    isPaused,
    onProgress,
    onEnd,
  } = props;

  const interval = React.useRef(null);
  const countDown = () => {
    setMs((time) => {
      if (time === 0) {
        clearInterval(interval.current);
        onEnd();
        return time;
      }
      const timeLeft = time - 1000;
      onProgress(timeLeft / minutesToMs(minutes))
      return timeLeft;
    })
  }

  React.useEffect(() => {
    if (isPaused) {
      if (interval.current) clearInterval(interval.current);
      return;
    }
    interval.current = setInterval(countDown, 1000);
    return () => clearInterval(interval.current);
  }, [isPaused]);

  const minutesToMs = (min) => min * 60 * 1000;
  const [ms, setMs] = React.useState(minutesToMs(minutes));

  const minute = Math.floor(ms / 1000 / 60) % 60;
  const seconds = (ms / 1000) % 60;

  const formatTime = (time) => time < 10 ? `0${time}` : time

  return (
    <View>
      <Text style={styles.text}>{`${formatTime(minute)}:${formatTime(seconds)}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: fontSize.xxxl,
    fontWeight: '600',
    color: palette.white,
    padding: spacing.xxl,
  },
});
