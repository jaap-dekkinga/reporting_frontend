import React from 'react';
import { Container, CssBaseline } from '@material-ui/core';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import TopBar from '../TopBar';
import Authenticated from '../Authenticated';
import Reports from '../Reports';

function App() {

  const theme = createMuiTheme({
    palette: {
      //type: themeState,
      /*
      background: {
        paper: '#80d8ff'
      },
      */
      primary: {
        main: '#147c9c'
      },
      secondary: {
        main: '#0a4050'
      }      
    }
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <Authenticated>
          <TopBar />
          <Container>
            <CssBaseline />
            <Reports />
          </Container>
        </Authenticated>
      </ThemeProvider>
    </>
  );
}

export default App;
