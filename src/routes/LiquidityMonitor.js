import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import LiqTable from '.././components/LiqTable';
import SlippageChecker from '.././components/SlippageChecker';

function LiquidityMonitor() {
  return (
    <div>
      <Tabs defaultActiveKey='Bitmex' id='uncontrolled-tab-example'>
        <Tab eventKey='Bitmex' title='Bitmex'>
          <LiqTable />
        </Tab>
        <Tab eventKey='FTX' title='FTX' disabled>
          <LiqTable />
        </Tab>
        <Tab eventKey='Bitmax' title='Bitmax' disabled>
          <LiqTable />
        </Tab>
      </Tabs>

      <hr />

      <SlippageChecker />
    </div>
  );
}

export default LiquidityMonitor;
