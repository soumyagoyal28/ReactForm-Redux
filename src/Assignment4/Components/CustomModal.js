import React from 'react'
import Dialog from '@mui/material/Dialog';


const CustomModal = (props) => {
  const{children, open, onClose} = props
  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        {children}
      </Dialog>
    </div>
  )
}

export default CustomModal
