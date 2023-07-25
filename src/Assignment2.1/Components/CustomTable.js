import { Table } from '@mui/material'
import React from 'react'

const CustomTable = (props) => {
    const{children, className} = props
  return (
    <div>
      <Table className={className}>
        {children}
      </Table>
    </div>
  )
}

export default CustomTable
