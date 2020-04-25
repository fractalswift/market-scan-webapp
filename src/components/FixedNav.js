import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

function FixedNav() {
  return (
    <Navbar bg='primary' variant='dark'>
      <Navbar.Brand href='/'>CryptoStats</Navbar.Brand>
      <div style={{ width: '40vw' }}></div>

      <Nav className='mr-auto justify-content-end'>
        <Nav.Link href='/'>Home</Nav.Link>
        <Nav.Link href='/LiquidityMonitor'>Liquidity Monitor</Nav.Link>
        <Nav.Link href='#'>Pairs Scanner</Nav.Link>
        <Nav.Link href='/Arbitrage'>Arbitrage</Nav.Link>
        <Nav.Link href='#'>News</Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default FixedNav;
