import { Box } from '@mui/material'
import Image from 'next/image'
import React from 'react'

export default function ChampImage({ alt, src, style, priority = false}) {
  return (
    <Box sx={style}>
      <Image
        alt={alt}
        src={src}
        fill={true}
        priority={priority}
      />
    </Box>
  )
}
