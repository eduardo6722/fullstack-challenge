import React from 'react';

import Routes from 'routes';

import GlobalStyle from 'styles/global';

import { ChartProvider } from 'context/chart/ChartContext';

function App() {
  return (
    <>
      <ChartProvider>
        <Routes />
      </ChartProvider>
      <GlobalStyle />
    </>
  );
}

export default App;
