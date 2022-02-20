import * as React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { palette, spacing, fontSize } from '../../utils/baseStyles';

export const TimerSetup = (props) => {
  const { setFocusTime, focusTime } = props;

  const presetDurations = [1, 15, 30];

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <Pressable
          disabled={focusTime <= 1}
          style={styles.button}
          onPress={() => setFocusTime(focusTime - 1)}>
          <Text style={{ color: palette.white, fontSize: fontSize.xxxl }}>-</Text>
        </Pressable>
        <View style={styles.focusTimeContainer}>
          <Text style={styles.focusTimeTitle}>Focus time:</Text>
          <Text style={styles.focusTime}>{focusTime} minutes</Text>
        </View>
        <Pressable
          style={styles.button}
          onPress={() => setFocusTime(focusTime + 1)}>
          <Text style={{ color: palette.white, fontSize: fontSize.xxxl }}>+</Text>
        </Pressable>
      </View>
      <View style={styles.buttonContainer}>
        {presetDurations.map((timeDuration) => {
          return (
            <Pressable
              style={[styles.button, { backgroundColor: palette.crayola }]}
              onPress={() => setFocusTime(timeDuration)}>
              <Text style={{ color: palette.white, fontSize: fontSize.lg }}>
                {timeDuration}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    margin: spacing.lg,
  },
  button: {
    margin: spacing.sm,
    width: 60,
    padding: spacing.lg,
    textAlign: 'center',
    alignItems: 'center',
    borderRadius: spacing.sm,
  },
  focusTimeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  focusTimeTitle: {
    color: palette.white,
    fontSize: fontSize.lg,
  },
  focusTime: {
    fontSize: fontSize.xl,
    color: palette.white,
  },
});
