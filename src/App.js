import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

import Container from 'react-bootstrap/Container';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import FixedNav from './components/FixedNav';

import LiquidityMonitor from './routes/LiquidityMonitor.js';
import Arbitrage from './routes/Arbitrage';
import Home from './routes/Home';

function App() {
  return (
    <Router>
      <div className='App'>
        <FixedNav />
        <hr />

        <Container>
          <Switch>
            <Route path='/LiquidityMonitor'>
              <LiquidityMonitor />
            </Route>
            <Route path='/Arbitrage'>
              <Arbitrage />
            </Route>
            <Route path='/'>
              <Home />
            </Route>
          </Switch>
        </Container>
      </div>
    </Router>
  );
}

export default App;
