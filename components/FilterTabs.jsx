import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
//import PhoneIcon from '@mui/icons-material/Phone';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import PersonPinIcon from '@mui/icons-material/PersonPin';
import { RecentActors } from '@mui/icons-material';

const items = [
  {
    label: 'All champions',
    icon: <RecentActors />
  },
  // {
  //   label: 'All champions',
  //   icon: <FavoriteIcon />
  // },
  // {
  //   label: 'All champions',
  //   icon: <PersonPinIcon />
  // },
]

export default function FilterTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Tabs 
        value={value} 
        onChange={handleChange}  
        aria-label="icon label tabs example" 
        TabIndicatorProps={{ sx: {backgroundColor: 'primary.pink'} }}
        style={{color: 'white'}}>
        {
          items.map(({label, icon}, key) => (
            <Tab key={key} style={{color: 'white', fontFamily: 'Azonix, sans-serif'}}  icon={icon} label={label} />
          ))
        }
        
      </Tabs>
    </>
  );
}