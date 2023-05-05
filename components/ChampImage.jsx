import React from 'react'

export default function ChampImage({champ, type}) {
  return (
    <img
        src={`http://ddragon.leagueoflegends.com/cdn/img/champion/${type}/${champ}_0.jpg`}
        alt={`Image of ${champ}`}
    />
  )
}
