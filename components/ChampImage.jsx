import { Box } from '@mui/material'
import Image from 'next/image'
import React from 'react'

export default function ChampImage({champ, type, style}) {
  return (
    <Box sx={style}>
      <Image
        fill={true}
        src={`http://ddragon.leagueoflegends.com/cdn/img/champion/${type}/${champ}_0.jpg`}
        alt={`Image of ${champ}`}
      />
    </Box>
  )
}
