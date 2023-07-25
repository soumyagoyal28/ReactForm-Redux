import React from 'react'
import { Link } from 'react-router-dom' 
import '../App.css'
const NavBar = () => {
  return (
    <div className='navBox'>
      <Link to="/">Home</Link>
      <Link to='/assignment1'>Assignment-1</Link>
      <Link to='/assignment2'>Assignment-2</Link>
      <Link to='/assignment3'>Assignment-3</Link>
    </div>
  )
}

export default NavBar
