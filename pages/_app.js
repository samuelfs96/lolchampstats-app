import SearchChampionContext from '@/store/context/searchChampionContext';
import '@/styles/globals.css'
import { grey } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { InitialState, searchChampion } from '@/store/reducers/searchChampion';
import { useReducer } from 'react';

const theme = createTheme({
  palette: {
    primary: {
      main: grey[900],
      blue: '#3a437a',
      pink: '#bb3162'
    },
  }
});

export default function App({ Component, pageProps }) {
  const store = useReducer(searchChampion, InitialState);
  return (
    <SearchChampionContext.Provider value={store}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </SearchChampionContext.Provider>
  )
}
