import ChampImage from '@/components/ChampImage'
import Layout from '@/components/Layout'
import RatingBox from '@/components/RatingBox'
import { Box, Chip, Container, Divider, Stack, Tooltip, tooltipClasses } from '@mui/material'
import { styled } from '@mui/material/styles';
import React from 'react'
import localFont from 'next/font/local';
import Carousel from '@/components/Carousel';
import Stats from '@/components/Stats';

const myFont = localFont({ src: '../../public/fonts/Azonix.otf' });
const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION;

const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} enterTouchDelay={0} placement="bottom" />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#000',
      color: 'white',
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #bb3162',
      borderRadius: '0px',
      padding: '1.25rem'
    },
}));

const ToltipInfo = ({name, description}) => {
    return (
        <>
            <div dangerouslySetInnerHTML={{__html: name}} style={{marginBottom: '.75rem', fontSize: '.8rem'}} className={myFont.className}></div>
            <div dangerouslySetInnerHTML={{__html: description}} style={{marginBottom: '0', fontSize: '.5rem', lineHeight: '.75rem'}} className={myFont.className}></div>
        </>
    )
}

const skins = (skins, champ) => {
    return skins.map(({num, name}) => ({
        label: name,
        imgPath:
          `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champ}_${num}.jpg`,
    }));
}

const getData = (stats) => {
    return {
        labels: Object.keys(stats).map(stat => stat.toUpperCase()), 
        data: Object.values(stats).map(stat => stat)
    };
}

export default function index({champion}) {
  return (
    <Layout title={`${champion?.name} - Lol Champion Stats`}>
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <ChampImage champ={champion?.id} type='splash' style={{width: '100%', filter: 'opacity(0.5)'}}/>
            <Box sx={{color: 'white', textAlign: 'center', position: 'absolute', fontSize: {xs: '1rem', sm: '2rem'}, '& *': {margin: '14px'}}}>
                <h1>{champion?.name}</h1>
                <p>{champion?.title}</p>
            </Box>
        </Box>
        <Container sx={{marginTop: '2rem', marginBottom: '2rem', color: 'white'}}>
            <Box sx={{
                display: 'flex', 
                justifyContent: 'center', 
                flexDirection: {xs: 'column', sm: 'column', lg: 'row'},
                gap: {xs: '1rem', sm: '1rem', lg: '2rem'}, 
                border: '1px solid', 
                padding: '1.75rem', 
                marginTop: '4rem',
                fontSize: '.6rem',
                borderColor: 'primary.pink'
            }}>
                <Box>
                    <h2 style={{marginTop: '0'}}>Role</h2>
                    <Stack direction="row" spacing={1}>
                        {champion?.tags.map((tag, index) => <Chip key={tag} label={tag} className={myFont.className} 
                            sx={{
                                backgroundColor: index%2 === 0 ? 'primary.pink' : 'primary.blue', 
                                color: 'white', 
                                fontSize: '.55rem',
                            }}/>)}
                    </Stack>
                    <br/>
                    <h2>Difficulty</h2>
                    <RatingBox value={champion?.info.difficulty}/>
                </Box>
                <Divider orientation="vertical" variant="middle" flexItem sx={{borderColor: 'primary.pink'}}/>
                <Box>
                    <h2>Lore</h2>
                    <p style={{marginBottom: '0'}}>{champion?.lore}</p>
                </Box>
            </Box>
            <Box sx={{
                display: 'flex', 
                justifyContent: 'center',
                border: '1px solid', 
                padding: '1.75rem', 
                marginTop: '4rem',
                fontSize: '1rem',
                borderColor: 'primary.blue',
                textAlign: 'center',
                gap: '2rem'
            }}>
                <Box sx={{width: '50%'}}>
                    <h2 style={{margin: 0}}>Spells</h2>
                    <Box sx={{display: 'flex', justifyContent: 'center', flexFlow: 'wrap', marginTop: '1.5rem', gap: '1rem'}}>
                        <HtmlTooltip key={champion?.passive?.name} title={<ToltipInfo name={champion?.passive?.name} description={champion?.passive?.description} />}>
                            <Box sx={{border: '1px solid white', '&:hover': {
                            opacity: '0.8',
                            transform: 'scale(1.05)',
                            transition: '.3s all ease'
                            }}}>
                                <img alt={`Image of ${champion?.passive?.name}`}
                                    src={`https://ddragon.leagueoflegends.com/cdn/${API_VERSION}/img/passive/${champion?.passive?.image.full}`}/>
                                <p style={{margin: '.25rem'}}>passive</p>
                            </Box>
                        </HtmlTooltip>
                        {
                            champion?.spells.map(spell => 
                                <HtmlTooltip key={spell.id} title={<ToltipInfo name={spell?.name} description={spell?.description} />} placement="top">
                                    <Box sx={{border: '1px solid white', '&:hover': {
                                        opacity: '0.8',
                                        transform: 'scale(1.05)',
                                        transition: '.3s all ease'
                                    }}}>
                                        <img  alt={`Image of ${spell.id}`} 
                                            src={`https://ddragon.leagueoflegends.com/cdn/${API_VERSION}/img/spell/${spell.image.full}`}/>
                                        <p style={{margin: '.25rem'}}>{spell.id.split('').pop()}</p>
                                    </Box>
                                </HtmlTooltip>
                            )
                        }
                    </Box>
                </Box>
                <Divider orientation="vertical" variant="middle" flexItem sx={{borderColor: 'primary.blue', display: {xs: 'none', md: 'block'}}}/>
                <Box sx={{display: 'flex', justifyContent: 'center'}}>
                    <h2 style={{margin: 0}}>Stats</h2>
                    <Box sx={{width: {xs: '80vw', md: '400px'}}}><Stats {
                        ...getData({
                            ...Object.entries(champion?.info).reduce((newObject, object) => {
                                const [key, value] = object;
                                newObject[key] = value * 10;
                                return newObject
                            }, {}), 
                            speed: parseInt(champion?.stats.movespeed * 100 / 425)
                        })
                    }/></Box>
                </Box>
            </Box>
            <Box sx={{
                display: 'flex', 
                justifyContent: 'center',
                flexDirection: 'column',
                marginTop: '4rem',
                fontSize: '1rem',
                textAlign: 'center'
            }}>
                <h2 style={{margin: 0}}>Skins</h2>
                <Carousel images={skins(champion?.skins, champion?.id)}/>
            </Box>
        </Container>
    </Layout>
  )
}

// This gets called on every request
export async function getServerSideProps({params}) {
  const { id } = params;
  // Fetch data from external API
  const res = await fetch(`http://ddragon.leagueoflegends.com/cdn/${API_VERSION}/data/en_US/champion/${id}.json`);
  const {data} = await res.json();
  const [champion] = Object.values(data);
 
//   // Pass data to the page via props
  return { props: { champion } };
}
