import ChampImage from '@/components/ChampImage';
import FilterTabs from '@/components/FilterTabs'
import Layout from '@/components/Layout'
import SearchChampionContext from '@/store/context/SearchChampionContext';
import { Box, Button, Container, Paper } from '@mui/material'
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

const INITIAL_COUNT = 20;

export default function Home({data}) {
  const [itemsCount, setItemsCount] = useState(INITIAL_COUNT)
  const [state, dispatch] = useContext(SearchChampionContext);
  const [newData, setNewData] = useState([]);

  //- FUNCTIONS

  const handleShowMore = useCallback(() => {
    setItemsCount(itemsCount => {
      const totalCount = itemsCount + INITIAL_COUNT;
      if(newData.length > totalCount) return totalCount;
      else return newData.length;
    });
  }, [newData]);

  const getTags = useMemo(() => {
    return [...(new Set(Object.values(data).reduce((newarray, {tags}) => {
      newarray.push(...tags)
      return newarray;
    }, [])))];
  },[data]);

  //-EFFECTS

  useEffect(() => {
    dispatch({
      type: 'multiple',
      text: '',
      filterValue: 'All champions'
    })
  }, [dispatch]);

  useEffect(() => {
    const { text, filterValue } = state;
    const filteredData = Object.values(data).filter(item => 
      item.name.toLowerCase().includes(text.toLowerCase()) && (item.tags.includes(filterValue) || filterValue === 'All champions')
    );
    setNewData(filteredData);
  }, [state, data]); 

  return (
    <>
      <Layout title="Lol Champion Stats">
        <Container sx={{marginTop: '2rem', marginBottom: '2rem', height: newData.length > 0 ? 'auto': '100vh'}}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <FilterTabs tags={getTags}/>
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
                newData.slice(0,itemsCount).map((value, index) => (
                  <Link href={`/champion/${value?.id}`} key={value?.id} 
                    style={{
                      textDecoration: 'none', 
                    }}>
                    <Paper 
                      square
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
                          transform: 'scale(1.025)'
                        }
                      }}
                    >
                      <h1 style={{textAlign: 'center', fontSize: '.85rem'}}>{value?.name}</h1>
                      <ChampImage
                        alt={`Image of ${value?.id}`}
                        src={`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${value?.id}_0.jpg`} 
                        style={{
                          width: '208px',
                          height: '360px',
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
          {
            newData.length > 0 && !(newData.length <= itemsCount) && (
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
            )
          }
        </Container>
      </Layout>
    </>
  )
}

// This gets called on every request
export async function getStaticProps() {
  const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION
  // Fetch data from external API
  //new api version 14.1.1
  const res = await fetch(`http://ddragon.leagueoflegends.com/cdn/${API_VERSION}/data/en_US/champion.json`);
  const {data} = await res.json();
 
  // // Pass data to the page via props
  return { props: { data } };
}
