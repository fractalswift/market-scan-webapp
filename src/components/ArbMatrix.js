import React, { Component } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

import Table from 'react-bootstrap/Table';

// create websockets for each exchange
const ftxWS = new W3CWebSocket('wss://ftx.com/ws/');
const deribitWS = new W3CWebSocket('wss://www.deribit.com/ws/api/v2/');
const bitmexWS = new W3CWebSocket('wss://www.bitmex.com/realtime');
const bybitWS = new W3CWebSocket(' wss://stream.bybit.com/realtime');
const coinbaseWS = new W3CWebSocket('wss://ws-feed.pro.coinbase.com');

class ArbMatrix extends Component {
  state = {
    ftxLast: 'Opening websocket...',
    bybitLast: 'Opening websocket...',
    bitmexLast: 'Opening websocket...',
    deribitLast: 'Opening websocket...',
    coinbaseLast: 'Opening websocket...',
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
  bitmexRequest = JSON.stringify({
    op: 'subscribe',
    args: ['instrument:XBTUSD'],
  });
  bybitRequest =
    '{"op": "subscribe", "args": ["instrument_info.100ms.BTCUSD"]}';

  coinbaseRequest = JSON.stringify({
    type: 'subscribe',
    channels: [{ name: 'ticker', product_ids: ['BTC-USD'] }],
  });

  componentDidMount() {
    ftxWS.onopen = () => {
      console.log('WebSocket ftxWS Connected');
      ftxWS.send(this.ftxRequest);
    };

    ftxWS.onmessage = (message) => {
      try {
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
        let last = JSON.parse(message.data).result.last_price;
        this.setState({ deribitLast: last });
      } catch (error) {
        console.log(error);
        this.setState({ deribitLast: 'waiting...' });
      }
    };

    bitmexWS.onopen = () => {
      console.log('WebSocket bitmex Connected');
      bitmexWS.send(this.bitmexRequest);
    };

    bitmexWS.onmessage = (message) => {
      let parsedMessage = JSON.parse(message.data);

      try {
        if (Object.keys(parsedMessage.data[0]).includes('lastPrice')) {
          let last = parsedMessage.data[0].lastPrice;
          this.setState({ bitmexLast: last });
        }
      } catch (error) {
        console.log(error);
      }
    };

    bybitWS.onopen = () => {
      console.log('WebSocket bybit Connected');
      bybitWS.send(this.bybitRequest);
    };
    bybitWS.onmessage = (message) => {
      let parsedMessage = JSON.parse(message.data);
      //   console.log(parsedMessage.data.update);

      try {
        if (
          Object.keys(parsedMessage.data.update[0]).includes('last_price_e4')
        ) {
          let last = parsedMessage.data.update[0].last_price_e4 / 10000;
          this.setState({ bybitLast: last });
        }
      } catch (error) {
        console.log(error);
      }
    };

    coinbaseWS.onopen = () => {
      console.log('WebSocket coinbase Connected');
      coinbaseWS.send(this.coinbaseRequest);
    };
    coinbaseWS.onmessage = (message) => {
      let parsedMessage = JSON.parse(message.data);

      try {
        if (Object.keys(parsedMessage).includes('price')) {
          let last = parsedMessage.price;
          console.log(last);
          this.setState({ coinbaseLast: last });
        }
      } catch (error) {
        console.log(error);
      }
    };
  }

  componentWillUnmount() {
    ftxWS.close();
    console.log('ftx closed...');
    bitmexWS.close();
    console.log('bitmex closed...');
    bybitWS.close();
    console.log('bybit closed...');
    deribitWS.close();
    console.log('deribit closed...');
    coinbaseWS.close();
    console.log('coinbase closed...');
  }

  renderTable = () => {
    return this.state.ftxLast;
  };

  renderCell = (fromPrice, toPrice) => {
    let spread = Math.round((fromPrice - toPrice) * 10) / 10;

    if (Number.isNaN(spread)) {
      spread = 'Waiting...';
    }

    let cellColor = 'black';
    if (spread < 0) {
      cellColor = 'red';
    } else if (spread > 0) {
      cellColor = 'green';
    } else {
      cellColor = 'black';
    }

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'center',
          backgroundColor: cellColor,
          padding: '14px',
          fontFamily: 'Tahoma',
          fontWeight: 'bold',
          fontSize: '14px',
          color: 'white',
        }}
      >
        <p>{fromPrice} </p>
        <p>{toPrice} </p>
        <p style={{ color: 'white' }}>{spread}</p>
      </div>
    );
  };

  render() {
    const { fromCurrency, toCurrency } = this.props;
    const {
      ftxLast,
      deribitLast,
      bitmexLast,
      bybitLast,
      coinbaseLast,
    } = this.state;
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
              <th>Coinbase</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>FTX</th>
              <td>{this.renderCell(ftxLast, ftxLast)}</td>
              <td>{this.renderCell(ftxLast, bybitLast)}</td>
              <td>{this.renderCell(ftxLast, deribitLast)}</td>
              <td>{this.renderCell(ftxLast, bitmexLast)}</td>
              <td>{this.renderCell(ftxLast, coinbaseLast)}</td>
            </tr>
            <tr>
              <th>Bybit</th>
              <td>{this.renderCell(bybitLast, ftxLast)}</td>
              <td>{this.renderCell(bybitLast, bybitLast)}</td>
              <td>{this.renderCell(bybitLast, deribitLast)}</td>
              <td>{this.renderCell(bybitLast, bitmexLast)}</td>
              <td>{this.renderCell(bybitLast, coinbaseLast)}</td>
            </tr>
            <tr>
              <th>Deribit</th>
              <td>{this.renderCell(deribitLast, ftxLast)}</td>
              <td>{this.renderCell(deribitLast, bybitLast)}</td>
              <td>{this.renderCell(deribitLast, deribitLast)}</td>
              <td>{this.renderCell(deribitLast, bitmexLast)}</td>
              <td>{this.renderCell(deribitLast, coinbaseLast)}</td>
            </tr>
            <tr>
              <th>Bitmex</th>
              <td>{this.renderCell(bitmexLast, ftxLast)}</td>
              <td>{this.renderCell(bitmexLast, bybitLast)}</td>
              <td>{this.renderCell(bitmexLast, deribitLast)}</td>
              <td>{this.renderCell(bitmexLast, bitmexLast)}</td>
              <td>{this.renderCell(bitmexLast, coinbaseLast)}</td>
            </tr>
            <tr>
              <th>Coinbase</th>
              <td>{this.renderCell(coinbaseLast, ftxLast)}</td>
              <td>{this.renderCell(coinbaseLast, bybitLast)}</td>
              <td>{this.renderCell(coinbaseLast, deribitLast)}</td>
              <td>{this.renderCell(coinbaseLast, bitmexLast)}</td>
              <td>{this.renderCell(coinbaseLast, coinbaseLast)}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}

export default ArbMatrix;
