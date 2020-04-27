import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Image from 'react-bootstrap/Image';

import Logo from '.././assets/decrypto-logo.png';
function FixedNav() {
  return (
    <Navbar bg='dark' variant='dark'>
      <Navbar.Brand href='/'>
        <Image
          src='./decrypto-logo-white.png'
          responsive
          width='100px'
          height='70px'
        />
      </Navbar.Brand>
      <div style={{ width: '40vw' }}></div>

      <Nav className='mr-auto justify-content-end'>
        <Nav.Link href='/'>Home</Nav.Link>
        <Nav.Link href='/LiquidityMonitor'>Liquidity Monitor</Nav.Link>
        <Nav.Link href='/PairsScanner'>Pairs Scanner</Nav.Link>
        <Nav.Link href='/Arbitrage'>Arbitrage</Nav.Link>
        <Nav.Link href='#'>News</Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default FixedNav;
