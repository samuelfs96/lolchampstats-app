import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import ClassIcon from '@mui/icons-material/Class';
import SearchChampionContext from '@/store/context/SearchChampionContext';
import { useMemo, useContext } from 'react';

const initialItems = [
  {
    label: 'All champions',
    icon: <ClearAllIcon />
  },
]

export default function FilterTabs({tags}) {
  const [state, dispatch] = useContext(SearchChampionContext);
  const handleChange = (event, newValue) => {
    dispatch({
      type: 'filter',
      filterValue: newValue
    })
  };

  const items = useMemo(() => {
    return [
      ...initialItems,
      ...tags.map(tag => ({
        label: tag,
        icon: <ClassIcon fontSize="small" />
      }))
    ]
  }, [tags])

  return (
    <>
      <Tabs 
        value={items.length > 0 ? state.filterValue : 'All champions'} 
        onChange={handleChange}  
        aria-label="icon label tabs example" 
        TabIndicatorProps={{ sx: {backgroundColor: 'primary.pink'} }}
        variant="scrollable"
        scrollButtons="auto"
        indicatorColor="primary"
        style={{color: 'white'}}>
        {
          items.map(({label, icon}, key) => (
            <Tab key={key} style={{color: 'white', fontSize: '.6rem', fontFamily: 'Azonix, sans-serif'}} value={label}  icon={icon} label={label} />
          ))
        }
        
      </Tabs>
    </>
  );
}