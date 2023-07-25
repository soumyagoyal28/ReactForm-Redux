import * as React from 'react';
import Button from '@mui/material/Button';

export default function BasicButtons(props) {
    const{type, variant, color, onClick, children} = props
  return (
      <Button type={type} variant={variant} color={color} onClick={onClick}>{children}</Button>
  );
}