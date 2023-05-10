import { Box } from '@mui/material'
import React from 'react'

export default function RatingBox({value}) {
  return (
    <Box sx={{display: 'flex'}}>
        {Array.from(Array(10).keys()).map((val) => <Box key={val} 
            sx={{
                width: '25px',
                height: '5px',
                border: '1px solid white',
                backgroundColor: value > val ? 'primary.pink' : 'transparent'
            }}
        />)}
    </Box>
  )
}
