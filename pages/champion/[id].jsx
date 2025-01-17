import ChampImage from '@/components/ChampImage'
import Layout from '@/components/Layout'
import RatingBox from '@/components/RatingBox'
import { Box, Chip, Container, Divider, Stack, Tooltip, tooltipClasses } from '@mui/material'
import { styled } from '@mui/material/styles';
import React from 'react'
import Carousel from '@/components/Carousel';
import Stats from '@/components/Stats';

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
            <div dangerouslySetInnerHTML={{__html: name}} style={{marginBottom: '.75rem', fontSize: '.8rem', fontFamily: 'Azonix, sans-serif', color: '#bb3162'}}/>
            <div dangerouslySetInnerHTML={{__html: description}} style={{marginBottom: '0', fontSize: '.5rem', lineHeight: '.75rem', fontFamily: 'Azonix, sans-serif'}}/>
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

const spells_key = ['q','w','e','r'];

export default function index({champion}) {
  return (
    <Layout title={`${champion?.name} - Lol Champion Stats`}>
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <ChampImage 
                priority={true}
                alt={`Image of ${champion?.id}`}
                src={`http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion?.id}_0.jpg`}
                style={{width: '100%', height: {lg: '100vh', sm: '70vh', xs: '35vh'}, filter: 'opacity(0.4)'}}/>
            <Box sx={{color: 'white', textAlign: 'center', position: 'absolute', fontSize: {xs: '1rem', sm: '2rem'}, '& *': {margin: '14px'}}}>
                <h1>{champion?.name}</h1>
                <p>{champion?.title}</p>
            </Box>
        </Box>
        <Container sx={{marginTop: '2rem', marginBottom: '2rem', color: 'white'}}>
            <Box sx={{
                display: 'flex', 
                justifyContent: 'center',
                alignItems: {xs: 'start', sm: 'center', lg: 'center'},
                flexDirection: {xs: 'column', sm: 'column', lg: 'row'},
                gap: {xs: '.5rem', sm: '1rem', lg: '2rem'}, 
                border: '1px solid', 
                padding: '1.75rem', 
                marginTop: '4rem',
                fontSize: '.6rem',
                borderColor: 'primary.pink'
            }}>
                <Box>
                    <h2 style={{marginTop: '0'}}>Role</h2>
                    <Stack direction="row" spacing={1}>
                        {champion?.tags.map((tag, index) => <Chip key={tag} label={tag}
                            sx={{
                                backgroundColor: index%2 === 0 ? 'primary.pink' : 'primary.blue', 
                                color: 'white', 
                                fontSize: '.55rem',
                                fontFamily: 'Azonix, sans-serif'
                            }}/>)}
                    </Stack>
                    <br/>
                    <h2>Difficulty</h2>
                    <RatingBox value={champion?.info.difficulty}/>
                </Box>
                <Divider orientation="vertical" variant="middle" flexItem sx={{borderColor: 'primary.pink'}}/>
                <Box>
                    <p style={{margin: '0'}}>{champion?.lore}</p>
                </Box>
            </Box>
            <Box sx={{
                display: 'flex', 
                justifyContent: 'space-around',
                border: '1px solid', 
                padding: '1.75rem', 
                marginTop: '4rem',
                fontSize: '1rem',
                borderColor: 'primary.blue',
                textAlign: 'center',
                flexDirection: {
                    xs: 'column',
                    sm: 'column',
                    lg: 'row'
                }
            }}>
                <Box>
                    <h2 style={{margin: 0}}>Spells</h2>
                    <Box sx={{display: 'flex', justifyContent: 'center', flexFlow: 'wrap', marginTop: '1.5rem', gap: '1rem'}}>
                        <HtmlTooltip key={champion?.passive?.name} title={<ToltipInfo name={champion?.passive?.name} description={champion?.passive?.description} />}>
                            <Box sx={{border: '1px solid white', cursor: 'pointer', '&:hover': {
                            opacity: '0.8',
                            transform: 'scale(1.05)',
                            transition: '.3s all ease'
                            }}}>
                                <ChampImage 
                                    style={{width: '54px', height: '54px', position: 'relative', margin: '0 auto'}}
                                    alt={`Image of ${champion?.passive?.name}`}
                                    src={`https://ddragon.leagueoflegends.com/cdn/${API_VERSION}/img/passive/${champion?.passive?.image.full}`}/>
                                <p style={{margin: '.25rem'}}>passive</p>
                            </Box>
                        </HtmlTooltip>
                        {
                            champion?.spells.map((spell, key) => 
                                <HtmlTooltip key={spell.id} title={<ToltipInfo name={spell?.name} description={spell?.description} />} placement="top">
                                    <Box sx={{border: '1px solid white', cursor: 'pointer', '&:hover': {
                                        opacity: '0.8',
                                        transform: 'scale(1.05)',
                                        transition: '.3s all ease'
                                    }}}>
                                        <ChampImage 
                                            style={{width: '54px', height: '54px', position: 'relative', margin: '0 auto'}}
                                            alt={`Image of ${spell.id}`} 
                                            src={`https://ddragon.leagueoflegends.com/cdn/${API_VERSION}/img/spell/${spell.image.full}`}/>
                                        <p style={{margin: '.25rem'}}>{spells_key[key]}</p>
                                    </Box>
                                </HtmlTooltip>
                            )
                        }
                    </Box>
                </Box>
                <Divider orientation="vertical" variant="middle" flexItem sx={{borderColor: 'primary.blue', display: {xs: 'none', md: 'block'}}}/>
                <Box sx={{display: 'flex', justifyContent: 'center', alignItems: {
                    xs: 'center',
                    sm: 'center',
                    lg: 'start'
                }, flexDirection: {
                    xs: 'column',
                    sm: 'column',
                    lg: 'row'
                }, marginTop: {
                    xs: '4rem',
                    sm: '4rem',
                    lg: 'auto'
                }}}>
                    <h2 style={{margin: 0}}>Stats</h2>
                    <Box sx={{width: {xs: '80vw', md: '80vw', lg: '400px'}, '& canvas': {
                        margin: '0 auto',
                        marginLeft: {
                            xs: '3%',
                            sm: 'auto',
                            lg: 'auto'
                        }
                    }}}><Stats {
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

export async function getStaticPaths() {
    const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION
    // Fetch data from external API
    const res = await fetch(`http://ddragon.leagueoflegends.com/cdn/${API_VERSION}/data/en_US/champion.json`);
    const {data} = await res.json();

    const paths = Object.keys(data).map((id) => ({
        params: { id },
    }));

    return {
      paths,
      fallback: false, // can also be true or 'blocking'
    };
}

// This gets called on every request
export async function getStaticProps({params}) {
  const { id } = params;
  // Fetch data from external API
  const res = await fetch(`http://ddragon.leagueoflegends.com/cdn/${API_VERSION}/data/en_US/champion/${id}.json`);
  const {data} = await res.json();
  const [champion] = Object.values(data);
 
//   // Pass data to the page via props
  return { props: { champion } };
}
