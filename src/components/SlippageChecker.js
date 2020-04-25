import React from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';

function SlippageChecker() {
  return (
    <div>
      <DropdownButton id='dropdown-item-button' title='Select market...'>
        <Dropdown.Item as='button'>BTC</Dropdown.Item>
        <Dropdown.Item as='button'>ETH</Dropdown.Item>
        <Dropdown.Item as='button'>LTC</Dropdown.Item>
      </DropdownButton>
      <Form>
        <Form.Group controlId='formBasicRange'>
          <Form.Label>Tolerable Slippage:</Form.Label>
          <Form.Control type='range' />
        </Form.Group>
      </Form>
    </div>
  );
}

export default SlippageChecker;
