import * as React from 'react';
// import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function BasicTextFields(props) {
    const {label,onChange, error, helperText,name,value} = props
  return (
    
      <TextField required name={name} value={value} onChange={onChange} label={label} variant="filled" error={error} helperText={helperText}/>
  );
}

