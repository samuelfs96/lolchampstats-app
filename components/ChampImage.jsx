import { Box } from '@mui/material'
import Image from 'next/image'
import React from 'react'

export default function ChampImage({loader, alt, src, style, priority = false}) {
  return (
    <Box sx={style}>
      <Image
        loader={loader}
        alt={alt}
        src={src}
        fill={true}
        priority={priority}
      />
    </Box>
  )
}
