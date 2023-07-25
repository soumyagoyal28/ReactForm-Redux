import React, { useState } from 'react';
import CustomTextField from './Components/CustomTextField';
import CustomRadioButton from './Components/CustomRadioButton';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import CustomCheckBox from './Components/CustomCheckBox';
import CustomButton from './Components/CustomButton';
import '../App.css';
import Box from '@mui/material/Box';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { addFormData } from './Actions';

export default function BasicTextFields() {
  
  const formData = useSelector((state) => state.formData);
  console.log(formData);
  const retreive = formData[formData.length-1];
  const myId = retreive?(retreive.id+1):1;
  const [formState, setFormState] = useState({
    id: myId,
    first: '',
    last: '',
    contact: '',
    email: '',
    gender: '',
    check: true
  });

  const [errors, setError]  = useState({
    first:'',
    last:'',
    contact:'',
    email:'',
    gender:'',
    check:''
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleChange = (e)=>{
    const name = e.target.name
    const value = e.target.value
    let error="";
    if (name === 'first' || name==="last") { 
      if (!/^[a-zA-Z]+$/.test(value)){
        error="Enter a Valid Name"
      }}
    if(name==='contact'){
      if (!/^[0-9]+$/.test(value) || value.length !== 10 ) {
        error = 'Enter a Valid No.';
      }}
    if (name === 'email') {
      if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value)) {
        error = 'Enter a Vaild Email';
      }}

  setFormState((prevState)=>({
    ...prevState,
    [name]:value
}))

  setError((prevState)=>({
    ...prevState,
    [name]:error
}))
  }

  function handleClick() {
      if(!formState.first){
        setError((prevState)=>({
          ...prevState,
          first:'First Name is required'
      }))
      return;
    }
      if(!formState.last){
        setError((prevState)=>({
          ...prevState,
          last:'Last Name is required'
      }))
      return;
    }
      if(!formState.contact){
        setError((prevState)=>({
          ...prevState,
          contact:'Contact No. is required'
      }))
      return;
    }
      if(!formState.email){
        setError((prevState)=>({
          ...prevState,
          email:'Email is required'
      }))
      return;
    }
      if(!formState.gender){
        setError((prevState)=>({
          ...prevState,
          gender:'Select Gender'
      }))
      return;
    }
      if(formState.check){
        setError((prevState)=>({
          ...prevState,
          check:'Accept T&C'
      }))
      return;
    }      
      if(!errors.first && !errors.last && !errors.contact && !errors.email && !errors.gender && !errors.check){
        dispatch({
          type: 'ADD_FORM_DATA',
          payload: formState,
        });
        console.log(formState);
        console.log('Submitted');
      
        setFormState({
          id:(formState.id+1),
          first: '',
          last: '',
          contact: '',
          email: '',
          gender: '',
          check: true
        });
    
        setError({
          first: '',
          last: '',
          contact: '',
          email: '',
          gender: '',
          check: ''
        });
      }
    }
    const handleTableButtonClick = () => {
      navigate('/table');
    };

  return (
    <div className='App'>
      <h1>React MUI Form</h1>
      <CustomTextField
      type='text' value={formState.first} label="First Name" name="first" 
      error={Boolean(errors.first)} helperText={errors.first} onChange={handleChange}
      /><br /><br />
      <CustomTextField
      type='text' value={formState.last} label="Last Name" name="last" 
      onChange={handleChange} error={Boolean(errors.last)} helperText={errors.last}
      /><br /><br />
      <CustomTextField 
      type='text' value={formState.contact} label="Contact Number" name="contact"  
      onChange={handleChange} error={Boolean(errors.contact)} helperText={errors.contact}
      /><br /><br />
      <CustomTextField 
      type='email' value={formState.email} name="email" label="Email"  
      onChange={handleChange} error={Boolean(errors.email)} helperText={errors.email}
      /><br />
    <FormControl>
    <FormLabel id="demo-row-radio-buttons-group-label" required>Gender</FormLabel>
    <RadioGroup required row name="gender" value={formState.gender} onChange={handleChange} >
      <FormControlLabel value="female" control={<CustomRadioButton />} label="Female" />
      <FormControlLabel value="male" control={<CustomRadioButton />} label="Male" />
      <FormControlLabel value="other" control={<CustomRadioButton />} label="Other" />
      </RadioGroup>
      <Box color="red">{errors.gender}</Box>
    </FormControl><br />
    <FormControlLabel required name = 'check' value={formState.check} onChange={()=>{
      setFormState(prevState=>({
        ...prevState,
        check:!formState.check
    })) 
      setError((prevState)=>({
        ...prevState,
        check:''
    }))
    }} 
    control={<CustomCheckBox />} label="Accept All Terms and Conditions" 
    /><Box color="red">{errors.check}</Box><br />
    <CustomButton type='submit' variant="contained"  onClick={handleClick}>Submit</CustomButton>
    <br /><br />
    <CustomButton type='button' variant="contained" onClick={handleTableButtonClick}>
        Go to Table
      </CustomButton>
    <div>
  {/* {formData.map((data, index) => (
    <div key={index}>
      <h4>First Name: {data.first}</h4>
      <h4>Last Name: {data.last}</h4>
      <h4>Contact: {data.contact}</h4>
      <h4>Email: {data.email}</h4>
      <h4>Gender: {data.gender}</h4>
    </div>
  ))} */}
</div>
    </div>
  );
}
