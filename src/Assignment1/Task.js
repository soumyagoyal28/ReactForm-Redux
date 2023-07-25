import React, {useState} from 'react';
import CustomTextField from './Components/CustomTextField'
import CustomRadioButton from './Components/CustomRadioButton'
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import CustomCheckBox from './Components/CustomCheckBox'
import CustomButton from './Components/CustomButton'
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import './App.css'

export default function BasicTextFields() {

    const[first, setFirst] = useState('');
    const[last, setLast] = useState('');
    const[contact, setContact] = useState('');
    const[email, setEmail] = useState('');
    const[gender, setGender] = useState('');
    const[check, setCheck] = useState(false);
    const [firstError, setFirstError] = useState('');
    const [lastError, setLastError] = useState('');
    const [contactError, setContactError] = useState('');
    const [emailError, setEmailError] = useState('');

    const theme = createTheme({
        palette: {
          neutral: {
            main: '#004236',
            contrastText: '#fff',
          },
        },
      });

    function handleFirst(e) {
        const value = e.target.value;
        const regex = /^[a-zA-Z]+$/;
        if (regex.test(value)) {
          setFirst(value);
          setFirstError('');
        } else {
          setFirst('');
          setFirstError('Enter a Valid Name');
        }
      }
    function handleLast(e){
        let value = e.target.value;
        let regex = /^[a-zA-Z]+$/;
        if (regex.test(value)){
            setLast(value);
            setLastError('');
        }
        else{
            setLast('');
            setLastError('Enter a Valid Name')
        }
    }
    function handleContact(e){
        let value = e.target.value
        let regex = /^[0-9]+$/;
        if (regex.test(value) && value.length === 10){
            setContact(value)
            setContactError('')
        }
        else{
            setContact('')
            setContactError('Enter a Valid Contact No.')
        }
    }
    function handleEmail(e){
        let value = e.target.value
        let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (regex.test(value)){
            setEmail(value)
            setEmailError('')
        }
        else{
            setEmail('')
            setEmailError('Enter a Valid Email')
        }
    }
    function handleGender(e){
            if (gender === false) {
                setGender('')
            } else {
                setGender(false)
            }
        }
    function handleClick() {
        if (first === '' || last === '' || contact === '' || email === '' || gender === '') {
          alert('Fill all Details');
        } if (check === false) {
            setCheck('')
          alert('Please accept the Terms and Conditions');
        } else {
            setCheck(false)
          console.log('Submitted');
        }
      }
  return (
    <div 
    // className='App'
    >
        <h1>React MUI Form</h1>
      <CustomTextField
          label="First Name" placeholder="First Name"
          onChange={handleFirst} error={Boolean(firstError)} helperText={firstError}
        /><br /><br />
        <CustomTextField
          label="Last Name" placeholder="Last Name"
          onChange={handleLast} error={Boolean(lastError)} helperText={lastError}
        /><br /><br />
        <CustomTextField
          label="Contact No." placeholder="Contact No."
          onChange={handleContact} error={Boolean(contactError)} helperText={contactError}
        /><br /><br />
        <CustomTextField
          label="Email" type="email" autoComplete="Email" placeholder="Email"
          onChange={handleEmail} error={Boolean(emailError)} helperText={emailError}
        /><br />
    <FormControl>
    <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
    <RadioGroup
      row aria-labelledby="demo-row-radio-buttons-group-label"
      name="row-radio-buttons-group" onClick={handleGender}>
      <FormControlLabel value="female" control={<CustomRadioButton />} label="Female" />
      <FormControlLabel value="male" control={<CustomRadioButton />} label="Male" />
      <FormControlLabel value="other" control={<CustomRadioButton />} label="Other" />
      </RadioGroup>
    </FormControl><br />
    <FormControlLabel required control={<CustomCheckBox />} label="Accept All Terms and Conditions" 
    /><br />
    <ThemeProvider theme={theme}>
    <CustomButton type='submit' variant="contained" color='neutral' onClick={handleClick}>Submit</CustomButton>
    </ThemeProvider>
    </div>
  );
}