import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { RoundedButton } from '../../components/RoundedButton/RoundedButton';
import { spacing, palette, fontSize } from '../../utils/baseStyles';
import Constants from 'expo-constants';

export const Focus = (props) => {
  const {
    addSubject
  } = props;
  const [subject, setSubject] = React.useState(null);
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>What shall we focus on?</Text>
        <Text style={{ fontSize: fontSize.sm, color: palette.white }}>Make it happen</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          label="Focus activity"
          onSubmitEditing={({ nativeEvent }) => {
            setSubject(nativeEvent.text)
          }}
        />
        <RoundedButton
          title='+'
          size={50}
          textStyle={{ color: palette.white, fontSize: fontSize.xl }}
          style={{ display: 'flex', justifyContent: 'center' }}
          onPress={() => {
            addSubject(subject)
          }
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: spacing.lg,
    padding: spacing.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    justifyContent: 'center',
  },
  title: {
    color: palette.white,
    fontWeight: '200',
    fontSize: fontSize.xl,
  },
  inputContainer: {
    paddingTop: spacing.xxxl,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 50,
    width: '100%',
    marginRight: spacing.md,
    borderRadius: spacing.sm,
  },

});
