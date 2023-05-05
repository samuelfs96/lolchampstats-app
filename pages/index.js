import ChampImage from '@/components/ChampImage';
import FilterTabs from '@/components/FilterTabs'
import Layout from '@/components/layout'
import { Box, Container, Paper } from '@mui/material'
import SearchChampionContext from '@/store/context/searchChampionContext';
import { useContext, useEffect, useState } from 'react';

export default function Home({data}) {
  const [state] = useContext(SearchChampionContext);
  const [newData, setNewData] = useState([]);

  useEffect(() => {
    const filterItems = Object.entries(data).filter(([key, value]) => value.name.toLowerCase().includes(state.text.toLowerCase()));
    setNewData(filterItems);
  }, [state, data]);

  return (
    <>
      <Layout title="Lol Champion Stats">
        <Container sx={{marginTop: '2rem', marginBottom: '2rem', height: newData.length > 0 ? 'auto': '100vh'}}>
          <h2>{state?.text}</h2>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <FilterTabs/>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '1rem',
              marginTop: '3rem'
            }}
          >
            {
              newData.length > 0 ? (
                newData.slice(0,12).map(([key, value], index) => (
                  <Paper key={key}
                    variant="outlined"
                    sx={{
                      backgroundColor: `${index%2 === 0 ? 'primary.blue' : 'primary.pink'}`,
                      color: 'white',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '3px',
                      overflow: 'hidden',
                      width: '250px',
                    }}
                  >
                    <h1 style={{textAlign: 'center', fontSize: '21px'}}>{value?.name}</h1>
                    <ChampImage champ={value?.id} type='loading'/>
                  </Paper>
                ))
              ) : (
                <Box sx={{marginTop: '4rem'}}>
                  <h2 style={{color: 'white'}}>Champion not found...</h2>
                </Box>
              )
            }
          </Box>
        </Container>
      </Layout>
    </>
  )
}

// This gets called on every request
export async function getServerSideProps() {
  const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION
  // Fetch data from external API
  const res = await fetch(`http://ddragon.leagueoflegends.com/cdn/${API_VERSION}/data/en_US/champion.json`);
  const {data} = await res.json();
 
  // Pass data to the page via props
  return { props: { data } };
}
