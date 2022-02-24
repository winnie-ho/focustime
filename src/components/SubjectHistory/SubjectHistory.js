import * as React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { palette, spacing, fontSize } from '../../utils/baseStyles';

export const SubjectHistory = (props) => {
  const {
    subjectHistory,
    clearHistory
  } = props;

  return (
    <View style={styles.container}>
      {subjectHistory.length > 0 && (
        <Text style={styles.completedTitle}>Completed tasks:</Text>
      )}
      {subjectHistory.map((subject) => (
        <Text style={styles.subject}>{subject}</Text>
      ))}
      {subjectHistory.length > 0 && <Pressable style={styles.clearButton} onPress={clearHistory}>
        <Text style={{ color: palette.white }}>clear</Text>
      </Pressable>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: spacing.xxxl,
    flex: 0.6,
  },
  subject: {
    color: palette.white,
  },
  completedTitle: {
    color: palette.white,
    fontSize: fontSize.lg,
    fontWeight: '200',
    marginBottom: spacing.md,
  },
  clearButton: {
    borderColor: palette.white,
    borderWidth: 1,
    padding: spacing.xs,
    marginTop: spacing.md,
    borderRadius: spacing.sm,
    alignItems: 'center',
    width: '20%',
  }
});
