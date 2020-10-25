import React from 'react';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import Routes from 'routes';

import GlobalStyle from 'styles/global';

import { ChartProvider } from 'context/chart/ChartContext';
import Button from 'components/Button';

function App() {
  return (
    <>
      <ChartProvider>
        <Routes />
      </ChartProvider>
      <GlobalStyle />
      <ToastContainer />
    </>
  );
}

export default App;
