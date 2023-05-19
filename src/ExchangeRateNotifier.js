import React, { useState, useEffect } from "react";
import { Card, TextField, FormControl, Select, MenuItem, Button, Typography } from "@mui/material";
import emailjs from '@emailjs/browser';

const ExchangeRateNotifier = () => {
  const [currency, setCurrency] = useState("INR");
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

    // Fetch the exchange rate from an API
    fetch(`https://api.exchangerate-api.com/v4/latest/USD`)
      .then((response) => response.json())
      .then((data) => {
        const exchangeRate = data.rates[currency];

        // Add the exchange rate to the templateParams object
        const templateParams = {
          from_name: name,
          to_email: email,
          currency: currency,
          exchange_rate: exchangeRate,
          day: time,
        };

        // Send the email
        emailjs
          .send(
            "service_h00e76c",
            "template_67gepjd",
            templateParams,
            "Q7gA84Gqq5S613ymk"
          )
          .then(
            (result) => {
              console.log(result.text);
            },
            (error) => {
              console.log(error.text);
            }
          );
      });
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
    > <Typography >
      Get Exchange Rate Notifications EveryDay
    </Typography>
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
            value={currency}
            onChange={(event) => setCurrency(event.target.value)}
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
};

export default ExchangeRateNotifier;
