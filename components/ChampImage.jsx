import { Skeleton } from '@mui/material';
import React, { useState } from 'react'

export default function ChampImage({champ, type}) {
    const [loaded, setLoaded] = useState(false);
  return (
    <>
    {!loaded && <Skeleton width={200} height={400}/>}
    <img
        style={{ display: loaded ? 'block' : 'none' }}
        src={`http://ddragon.leagueoflegends.com/cdn/img/champion/${type}/${champ}_0.jpg`}
        alt={`Image of ${champ}`}
        onLoad={() => setLoaded(true)}
    />
    </>
  )
}
