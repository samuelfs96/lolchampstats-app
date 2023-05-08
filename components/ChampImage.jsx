import React from 'react'

export default function ChampImage({champ, type, style}) {
  return (
    <>
    <img
      style={style}
      src={`http://ddragon.leagueoflegends.com/cdn/img/champion/${type}/${champ}_0.jpg`}
      alt={`Image of ${champ}`}
    />
    </>
  )
}
