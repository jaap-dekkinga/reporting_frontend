import React, { useMemo } from 'react';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Navigation from '../Navigation';
import Authenticated from '../Authenticated';
import Reports from '../Reports';

function App() {

  const theme = useMemo(() => createMuiTheme({
    typography: {
      fontFamily: [
        'Cairo'
      ].join(',')
    },
    palette: {
      //type: themeState,
      /*
      background: {
        paper: '#80d8ff'
      },
      */
      primary: {
        main: '#147c9c',
        dark: '#0d5166',
      },
      secondary: {
        main: '#7e57c2' //400
      },
      action: {
        //focusOpacity: 0.2,
        //hoverOpacity: 0.2,
        selected: '#26a69a',
        hover: 'rgba(178, 223, 219, 0.3)',//'#b2dfdb', // 50
      }
    }
  }), []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Authenticated>
          <Navigation />
          <Reports />
        </Authenticated>
      </ThemeProvider>
    </>
  );
}

export default App;
