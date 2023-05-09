import ChampImage from '@/components/ChampImage';
import FilterTabs from '@/components/FilterTabs'
import Layout from '@/components/Layout'
import SearchChampionContext from '@/store/context/SearchChampionContext';
import { Box, Button, Container, Paper } from '@mui/material'
import { useCallback, useContext, useEffect, useState } from 'react';
import localFont from 'next/font/local';
import Link from 'next/link';

const myFont = localFont({ src: '../public/fonts/Azonix.otf' });

export default function Home({data}) {
  const [itemsCount, setItemsCount] = useState(15)
  const [state] = useContext(SearchChampionContext);
  const [newData, setNewData] = useState([]);

  const handleShowMore = useCallback(() => {
    setItemsCount(itemsCount => {
      const totalCount = itemsCount + 15;
      if(newData.length > totalCount) return totalCount;
      else return newData.length;
    });
  }, [newData])

  // useEffect(() => {
  //   const filterItems = Object.entries(data).filter(([key, value]) => value.name.toLowerCase().includes(state.text.toLowerCase()));
  //   setNewData(filterItems);
  // }, [state, data]);

  return (
    <>
      <Layout title="Lol Champion Stats">
        <Container sx={{marginTop: '2rem', marginBottom: '2rem', height: newData.length > 0 ? 'auto': '100vh'}}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <FilterTabs/>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '.5rem',
              marginTop: '3rem'
            }}
          >
            {
              newData.length > 0 ? (
                newData.slice(0,itemsCount).map(([key, value], index) => (
                  <Link href={`/champion/${key}`} key={key} 
                    style={{
                      textDecoration: 'none', 
                    }}>
                    <Paper 
                      variant="outlined"
                      sx={{
                        backgroundColor: `${index%2 === 0 ? 'primary.blue' : 'primary.pink'}`,
                        color: 'white',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '3px',
                        overflow: 'hidden',
                        width: { xs: '300px', md: '200px' },
                        alignItems: 'center',
                        transition: '.3s all ease',
                        '&:hover': {
                          opacity: '0.8',
                          transform: 'scale(1.05)'
                        }
                      }}
                    >
                      <h1 style={{textAlign: 'center', fontSize: '21px'}}>{value?.name}</h1>
                      <ChampImage champ={value?.id} type='loading'/>
                    </Paper>
                  </Link>
                ))
              ) : (
                <Box sx={{marginTop: '4rem'}}>
                  <h2 style={{color: 'white'}}>Champion not found...</h2>
                </Box>
              )
            }
          </Box>
          <Box sx={{marginTop: '4rem', display:'flex', justifyContent: 'center'}}>
            <Button 
              variant="contained" 
              className={myFont.className}
              onClick={handleShowMore}
              sx={{
                backgroundColor: 'primary.pink',
                '&:hover': {
                  backgroundColor: 'primary.pink',
                  opacity: '0.8',
                  transition: '.3s all ease'
                },
              }}>Show More</Button>
          </Box>
        </Container>
      </Layout>
    </>
  )
}

// This gets called on every request
export async function getServerSideProps({req}) {
  // const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION
  // // Fetch data from external API
  // const res = await fetch(`http://ddragon.leagueoflegends.com/cdn/${API_VERSION}/data/en_US/champion.json`);
  // const {data} = await res.json();
 
  // // Pass data to the page via props
  return { props: { data: {} } };
}
