import React from 'react';
import {InputField} from './styles';

export default function TextInput({placeholder, style, value, onChangeText}) {
  return (
    <InputField
      placeholder={placeholder}
      style={style}
      value={value} // 상태 값 전달
      onChangeText={onChangeText} // 상태 업데이트 핸들러 전달
    />
  );
}
