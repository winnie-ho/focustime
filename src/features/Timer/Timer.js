import * as React from 'react';
import { View, Text, StyleSheet, Vibration, Platform } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { spacing, fontSize, palette } from '../../utils/baseStyles';
import { RoundedButton } from '../../components/RoundedButton/RoundedButton';
import { Countdown } from '../../components/Countdown/Countdown';
import { useKeepAwake } from 'expo-keep-awake';

export const Timer = (props) => {
  const {
    updateHistory,
  } = props;

  useKeepAwake();
  const { focusSubject, minutes, clear } = props;

  const [isStarted, setIsStarted] = React.useState(false);
  const [progress, setProgress] = React.useState(1);
  const [complete, setComplete] = React.useState(false);

  const onEnd = () => {
    setProgress(1);
    setIsStarted(false);
    setComplete(true);
    vibrate();
    updateHistory(focusSubject);
  };

  const vibrate = () => {
    if (Platform.OS === 'ios') {
      const interval = setInterval(() => Vibration.vibrate(), 1000);
      setTimeout(() => clearInterval(interval), 5000);
    } else {
      Vibration.vibrate(5000);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 60 }}>
        <View style={styles.countdown}>
          <Countdown
            minutes={minutes}
            isPaused={!isStarted}
            onProgress={setProgress}
            onEnd={onEnd}
          />
          {complete && <Text style={styles.task}>Complete!</Text>}
        </View>

        <Text style={styles.title}>Focusing on:</Text>
        <Text style={styles.task}>{focusSubject}</Text>
      </View>

      <View style={styles.progressBar}>
        <ProgressBar color={palette.crayola} progress={progress} />
      </View>

      <View style={styles.buttonContainer}>
        {isStarted ? (
          <RoundedButton
            textStyle={{ color: palette.white }}
            style={{ display: 'flex', justifyContent: 'center' }}
            title="pause"
            size={80}
            onPress={() => setIsStarted(false)}
          />
        ) : (
          <View style={!complete && styles.buttonPair}>
            {!complete && (
              <RoundedButton
                textStyle={{ color: palette.white }}
                style={{ display: 'flex', justifyContent: 'center' }}
                title="start"
                size={80}
                onPress={() => setIsStarted(true)}
              />
            )}
            <RoundedButton
              textStyle={{ color: palette.white }}
              style={{ display: 'flex', justifyContent: 'center' }}
              title="clear"
              size={80}
              onPress={() => clear()}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    flex: 1,
  },
  title: {
    color: palette.white,
    fontSize: fontSize.md,
    margin: spacing.md,
  },
  buttonContainer: {
    flex: 0.7,
    padding: spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonPair: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  task: {
    fontWeight: '600',
    textAlign: 'center',
    fontSize: fontSize.xl,
    margin: spacing.xxl,
    color: palette.white,
  },
  countdown: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: spacing.xxl,
  },
  progressBar: {
    width: '100%',
  },
});
