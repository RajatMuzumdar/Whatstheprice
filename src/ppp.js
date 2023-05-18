import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';
// import CountryCard from "./CountryCard";
import fetchPPP from 'purchasing-power-parity';

export default function pppnot() {
  const [amount, setAmount] = useState('1');
  const [fromCurrency, setFromCurrency] = useState("INR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [currencies, setCurrencies] = useState([]);
  const [result, setResult] = useState('');
  const [rate, setRate] = useState(null);

  useEffect(() => {
    fetch('https://api.purchasing-power-parity.com/?target=ID')
      .then(response => response.json())
      .then(data => {
        setCurrencies(Object.keys(data.rates));
      });
  }, []);
  fetchPPP().then(response => {
    discountPrice = response.ppp.pppConversionFactor * originalPrice;
  });
    
  

  useEffect(() => {
    if (fromCurrency && toCurrency) {
      fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
        .then(response => response.json())
        .then(data => {
          setRate(data.rates[toCurrency]);
        });
    }
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    if (amount && rate) {
      setResult(amount * rate);
    }
  }, [amount, rate]);

  const handleAmountChange = e => {
    const value = e.target.value;
    if (value === '' || /^\d+(\.\d{0,2})?$/.test(value)) {
      setAmount(value);
    }
  };

  const handleResultChange = e => {
    const value = e.target.value;
    if (value === '' || /^\d+(\.\d{0,2})?$/.test(value)) {
      setResult(value);
      if (rate) {
        setAmount(value / rate);
      }
    }
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: '25ch' }}>
        <InputLabel id="select-from">FROM</InputLabel>
        <Select
          labelId="select-from"
          value={fromCurrency}
          label="FROM"
          onChange={e => setFromCurrency(e.target.value)}
        >
          {currencies.map(currency => (
            <MenuItem key={currency} value={currency}>
              {currency}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <br />
      <TextField
        sx={{ m: 1, minWidth: '25ch' }}
        label="AMOUNT"
        type="text"
        value={amount}
        onChange={handleAmountChange}
      />
      <br />
      <FormControl sx={{ m: 1, minWidth: '25ch' }}>
        <InputLabel id="select-to">TO</InputLabel>
        <Select
          labelId="select-to"
          value={toCurrency}
          label="TO"
          onChange={e => setToCurrency(e.target.value)}
        >
          {currencies.map(currency => (
            <MenuItem key={currency} value={currency}>
              {currency}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <br />
      
      <TextField
        sx={{ m: 1, minWidth: '25ch' }}
        label="RESULT"
        type="text"
        value={result}
        onChange={handleResultChange}
      />
      {/* <CountryCard value= 'INDIA'></CountryCard> */}
    </div>
  );
}

