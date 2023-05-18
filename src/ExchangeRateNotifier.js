import React, { useState, useEffect } from "react";
import {
  Card,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Button,
} from "@mui/material";

import emailjs from '@emailjs/browser';

const ExchangeRateNotifier = () => {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [currencies, setCurrencies] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [time, setTime] = useState("08:00");

  useEffect(() => {
    fetch("https://api.exchangerate-api.com/v4/latest/USD")
      .then((response) => response.json())
      .then((data) => {
        setCurrencies(Object.keys(data.rates));
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const templateParams = {
      from_name: name,
      to_email: email,
      from_currency: fromCurrency,
      to_currency: toCurrency,
      day: time,
    };
    emailjs
      .send(
        "service_7skj89g",
        "service_7skj89g",
        templateParams,
        "rajat"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <Card
      sx={{
        maxWidth: "40ch",
        maxHeight: "50ch",
        alignContent: "Center",
        padding: "5ch",
        margin: "5ch",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
      }}
    >
      <form onSubmit={handleSubmit}>
        <TextField
          sx={{ m: 1, minWidth: "37ch" }}
          label="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
        <br />
        <TextField
          sx={{ m: 1, minWidth: "37ch" }}
          label="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          type="email"
          required
        />
        <br />
        <FormControl sx={{ m: 1, minWidth: "37ch" }}>
          <Select
            value={fromCurrency}
            onChange={(event) => setFromCurrency(event.target.value)}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 48 * 4.5 + 8,
                  width: "25ch",
                },
              },
            }}
          >
            {currencies.map((currency) => (
              <MenuItem key={currency} value={currency}>
                {currency}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <br />
        <FormControl sx={{ m: 1, minWidth: "37ch" }}>
          <Select
            value={toCurrency}
            onChange={(event) => setToCurrency(event.target.value)}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 48 * 4.5 + 8,
                  width: "25ch",
                },
              },
            }}
          >
            {currencies.map((currency) => (
              <MenuItem key={currency} value={currency}>
                {currency}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <br />
        <TextField
          sx={{ m: 1, minWidth: "37ch" }}
          label="Day"
          type="time"
          value={time}
          onChange={(event) => setTime(event.target.value)}
          required
        />
        <br />
        <Button variant="contained" type="submit">
          Send Email
        </Button>
</form>
</Card>
);
}
export default ExchangeRateNotifier;