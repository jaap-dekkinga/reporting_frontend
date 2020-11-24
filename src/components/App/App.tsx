import React from 'react';
import { Container, CssBaseline } from '@material-ui/core';

import Authenticated from '../Authenticated';
import Reports from '../Reports';


function App() {
  
  return (
    <Container>
      <CssBaseline />
        <Authenticated>
          <Reports />
        </Authenticated>
    </Container>
  );
}

export default App;
