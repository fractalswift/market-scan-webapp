import React, { Component } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

import Table from 'react-bootstrap/Table';

const ftxWS = new W3CWebSocket('wss://ftx.com/ws/');
const deribitWS = new W3CWebSocket('wss://www.deribit.com/ws/api/v2/');

class ArbMatrix extends Component {
  state = {
    ftxLast: 0,
    bybitLast: 0,
    bitmexLast: 0,
    deribitLast: 0,
    fromCurrency: this.props.from,
    toCurrency: this.props.to,
  };

  // request objects for each exchange endpoint
  ftxRequest = '{"op": "subscribe", "channel": "ticker", "market": "BTC-PERP"}';
  deribitRequest = JSON.stringify({
    jsonrpc: '2.0',
    id: 8066,
    method: 'public/ticker',
    params: {
      instrument_name: 'BTC-PERPETUAL',
    },
  });

  componentDidMount() {
    ftxWS.onopen = () => {
      console.log('WebSocket ftxWS Connected');
      ftxWS.send(this.ftxRequest);
    };

    ftxWS.onmessage = (message) => {
      try {
        console.log(JSON.parse(message.data).data.last);
        let last = JSON.parse(message.data).data.last;
        this.setState({ ftxLast: last });
      } catch (error) {
        console.log(error);
        this.setState({ ftxLast: 'waiting...' });
      }
    };

    deribitWS.onopen = () => {
      console.log('WebSocket deribit Connected');
      deribitWS.send(this.deribitRequest);
    };
    deribitWS.onmessage = (message) => {
      try {
        console.log(JSON.parse(message.data).result.last_price);

        let last = JSON.parse(message.data).result.last_price;
        this.setState({ deribitLast: last });
      } catch (error) {
        console.log(error);
        this.setState({ deribitLast: 'waiting...' });
      }
    };
  }

  componentWillUnmount() {
    ftxWS.close();
    console.log('ftx closed...');
    deribitWS.close();
    console.log('deribit closed...');
  }

  renderTable = () => {
    return this.state.ftxLast;
  };

  renderCell = (fromPrice, toPrice) => {
    let spread = fromPrice - toPrice;

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'center',
        }}
      >
        <p>{fromPrice} </p>
        <p>{toPrice} </p>
        <p>{spread}</p>
      </div>
    );
  };

  render() {
    const { fromCurrency, toCurrency } = this.props;
    const { ftxLast, deribitLast } = this.state;
    return (
      <div>
        FROM {fromCurrency} TO: {toCurrency}
        <Table bordered>
          <thead>
            <tr>
              <th></th>
              <th>FTX</th>
              <th>Bybit</th>
              <th>Deribit</th>
              <th>Bitmex</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>FTX</th>
              <td>{this.renderCell(ftxLast, ftxLast)}</td>
              <td>Placeholder</td>
              <td>{this.renderCell(deribitLast, ftxLast)}</td>
              <td>Placeholder</td>
            </tr>
            <tr>
              <th>Bybit</th>
              <td>Placeholder</td>
              <td>Placeholder</td>
              <td>Placeholder</td>
              <td>Placeholder</td>
            </tr>
            <tr>
              <th>Deribit</th>
              <td>{this.renderCell(ftxLast, deribitLast)}</td>
              <td>Placeholder</td>
              <td>Placeholder</td>
              <td>Placeholder</td>
            </tr>
            <tr>
              <th>Bitmex</th>
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
}

export default ArbMatrix;
