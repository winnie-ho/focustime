import * as React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { palette } from '../../utils/baseStyles';

export const RoundedButton = ({
  style = {},
  textStyle = {},
  size = 100,
  ...props
}) => {
  return (
    <TouchableOpacity
      style={[styles(size).radius, style]}
      onPress={props.onPress}>
      <Text style={[(styles(size).text, textStyle)]}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = (size) =>
  StyleSheet.create({
    radius: {
      borderRadius: size / 2,
      width: size,
      height: size,
      alignItems: 'center',
      borderColor: palette.white,
      borderWidth: 2,
    },
    text: {
      color: palette.white,
      fontSize: size / 3,
    },
  });
