import React, { Component } from 'react';

import { Dropdown } from 'semantic-ui-react';

import ArbMatrix from '.././components/ArbMatrix';

const currencyOptions = [
  {
    key: 'BTC',
    text: 'BTC',
    value: 'BTC',
    image: { avatar: true, src: '/images/avatar/small/jenny.jpg' },
  },
  {
    key: 'ETH',
    text: 'ETH',
    value: 'ETH',
    image: { avatar: true, src: '/images/avatar/small/elliot.jpg' },
  },
  {
    key: 'LTC',
    text: 'LTC',
    value: 'LTC',
    image: { avatar: true, src: '/images/avatar/small/stevie.jpg' },
  },
  {
    key: 'USD',
    text: 'USD',
    value: 'USD',
    image: { avatar: true, src: '/images/avatar/small/stevie.jpg' },
  },
];

class Arbitrage extends Component {
  state = { fromCurrency: 'BTC', toCurrency: 'USD' };

  changeFrom = (e, { value }) => this.setState({ fromCurrency: value });

  changeTo = (e, { value }) => this.setState({ toCurrency: value });

  render() {
    const { fromCurrency, toCurrency } = this.state;
    console.log(this.state.fromCurrency);
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <strong>FROM CURRENCY:</strong>{' '}
          <Dropdown
            placeholder='Select From Currency...'
            compact
            selection
            options={currencyOptions}
            onChange={this.changeFrom}
            value={fromCurrency}
          />
          <strong>TO CURRENCY:</strong>{' '}
          <Dropdown
            placeholder='Select To Currency...'
            compact
            selection
            options={currencyOptions}
            onChange={this.changeTo}
            value={toCurrency}
          />
        </div>
        <hr />
        <ArbMatrix fromCurrency={fromCurrency} toCurrency={toCurrency} />
      </div>
    );
  }
}

export default Arbitrage;
