import * as React from 'react';
// import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function CheckboxLabels(props) {
  const{...sprops}=props
  return (
  <FormControlLabel control={<Checkbox {...sprops}/>} />
  );
}