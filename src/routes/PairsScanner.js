import React, { useState, useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';

function PairsScanner() {
  const [pairs, setPairs] = useState([['Running scan...', 'Please wait...']]);
  const [status, setStatus] = useState('ready');
  const [loadingTime, setLoadingTime] = useState(0);

  const runScan = () => {
    setStatus('scanning');

    fetch('/api/scanforpairs')
      .then((res) => res.json())
      .then((data) => {
        setPairs(data.pairs);
        setStatus('loaded');
      });
  };

  const loadingSpinner = () => {
    return (
      <div style={{ padding: '20px' }}>
        <div style={{ height: '40px' }}></div>
        <Spinner animation='border' role='status'>
          SCANNING...
        </Spinner>
        <div style={{ height: '40px' }}></div>
        <p>Scanning...Please wait up to 20 seconds...</p>
      </div>
    );
  };

  const renderTable = (status) => {
    switch (status) {
      case 'ready':
        return <div></div>;
      case 'loaded':
        let table = pairs.map((pair) => {
          return (
            <tr>
              <td>{pair[0]}</td>
              <td>{pair[1]}</td>
            </tr>
          );
        });
        return (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Pair</th>
                <th>Divergence %</th>
              </tr>
            </thead>
            <tbody>{table}</tbody>
          </Table>
        );
      case 'scanning':
        return loadingSpinner();
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <p>
        Pairs scanner looks for pairs of assets on FTX exchange that have an
        unusual divergence from their normal relationship, based on hourly
        candles.
      </p>
      <Button variant='primary' size='lg' onClick={runScan}>
        Run scan
      </Button>
      {renderTable(status)}
    </div>
  );
}

export default PairsScanner;
