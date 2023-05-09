import ChampImage from '@/components/ChampImage';
import FilterTabs from '@/components/FilterTabs'
import Layout from '@/components/Layout'
import SearchChampionContext from '@/store/context/SearchChampionContext';
import { Box, Button, Container, Paper } from '@mui/material'
import { useCallback, useContext, useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home({data}) {
  const [itemsCount, setItemsCount] = useState(12)
  const [state] = useContext(SearchChampionContext);
  const [newData, setNewData] = useState([]);

  const handleShowMore = useCallback(() => {
    setItemsCount(itemsCount => {
      const totalCount = itemsCount + 12;
      if(newData.length > totalCount) return totalCount;
      else return newData.length;
    });
  }, [newData])

  useEffect(() => {
    const filterItems = Object.entries(data).filter(([key, value]) => value.name.toLowerCase().includes(state.text.toLowerCase()));
    setNewData(filterItems);
  }, [state, data]);

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
                        alignItems: 'center',
                        transition: '.3s all ease',
                        '&:hover': {
                          opacity: '0.8',
                          transform: 'scale(1.05)'
                        }
                      }}
                    >
                      <h1 style={{textAlign: 'center', fontSize: '21px'}}>{value?.name}</h1>
                      <ChampImage
                        alt={`Image of ${key}`}
                        src={`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${value?.id}_0.jpg`} 
                        style={{
                          width: '225px',
                          height: '400px',
                          position: 'relative'
                        }}
                      />
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
              onClick={handleShowMore}
              sx={{
                animation: 'pulse 2s infinite',
                backgroundColor: 'primary.pink',
                fontFamily: 'Azonix, sans-serif',
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
export async function getStaticProps() {
  const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION
  // Fetch data from external API
  const res = await fetch(`http://ddragon.leagueoflegends.com/cdn/${API_VERSION}/data/en_US/champion.json`);
  const {data} = await res.json();
 
  // // Pass data to the page via props
  return { props: { data } };
}
