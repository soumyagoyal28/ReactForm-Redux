import * as React from 'react';
import Radio from '@mui/material/Radio';

export default function RowRadioButtonsGroup(props) {
  const{...restProps}=props
  return (
    <Radio {...restProps}></Radio>
  );
}