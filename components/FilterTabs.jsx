import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
//import PhoneIcon from '@mui/icons-material/Phone';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import PersonPinIcon from '@mui/icons-material/PersonPin';
import localFont from 'next/font/local';
import { RecentActors } from '@mui/icons-material';
// Font files can be colocated inside of `pages`
const myFont = localFont({ src: '../public/fonts/Azonix.otf' });

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
            <Tab key={key} className={myFont.className} style={{color: 'white'}}  icon={icon} label={label} />
          ))
        }
        
      </Tabs>
    </>
  );
}