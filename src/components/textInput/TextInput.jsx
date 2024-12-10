import React from 'react';
import {InputField} from './styles';

export default function TextInput({
  placeholder,
  style,
  value,
  onChangeText,
  onFocus,
  editable,
}) {
  return (
    <InputField
      placeholder={placeholder}
      style={style}
      value={value}
      onChangeText={onChangeText}
      onFocus={onFocus}
      editable={editable}
    />
  );
}
