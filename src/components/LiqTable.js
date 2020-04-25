import React from 'react';

import Table from 'react-bootstrap/Table';

function LiqTable() {
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Market</th>
            <th>Sell Side Liquidity</th>
            <th>Buy Side Liquidity</th>
            <th>Best Sell Price</th>
            <th>Best Buy Price</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Placeholder</td>
            <td>Placeholder</td>
            <td>Placeholder</td>
            <td>Placeholder</td>
            <td>Placeholder</td>
          </tr>
          <tr>
            <td>Placeholder</td>
            <td>Placeholder</td>
            <td>Placeholder</td>
            <td>Placeholder</td>
            <td>Placeholder</td>
          </tr>
          <tr>
            <td>Placeholder</td>
            <td>Placeholder</td>
            <td>Placeholder</td>
            <td>Placeholder</td>
            <td>Placeholder</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default LiqTable;
