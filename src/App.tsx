import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Route from './routes';

import AppProvider from './hooks';

import GlobalStyle from './styles/global';

const App: React.FC = () => (
  <Router>
    <AppProvider>
      <Route />
    </AppProvider>

    <GlobalStyle />
  </Router>
);

export default App;
