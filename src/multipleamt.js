import React, { useState, useEffect } from "react";
import {
  Card,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";

const ExchangeRates = ({ fromCurrency, toCurrency }) => {
  const [rates, setRates] = useState({});

  useEffect(() => {
    const fetchRates = async () => {
      const response = await fetch(
        `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
      );
      const data = await response.json();
      setRates(data.rates);
    };
    fetchRates();
  }, [fromCurrency]);

  return (
    <Card
      sx={{
        // maxWidth: "50ch",
        // maxHeight: "280ch",
        padding: "3ch",
        margin: "2rem",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
      }}
    >
      <Typography variant="h4" component="h2" align="center" gutterBottom>
        {fromCurrency} to {toCurrency} Conversion Rates
      </Typography>
      <Table
        sx={{
          m: 1,
          [`& .${tableCellClasses.root}`]: {
            borderBottom: "none",
          },
        }}
        style={{ backgroundColor: "white" }}
      >
        <TableHead>
          <TableRow>
            <TableCell style={{ fontSize: "25px", textAlign: "center" }}>
              {fromCurrency}
            </TableCell>
            <TableCell style={{ fontSize: "25px", textAlign: "center" }}>
              {toCurrency}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {[1, 2, 7, 70, 210, 350, 700, 777, 7000, 14000].map((value) => (
            <TableRow key={value}>
              <TableCell style={{ fontSize: "17px", textAlign: "center" }}>
                {value}
              </TableCell>
              <TableCell style={{ fontSize: "17px", textAlign: "center" }}>
                {(value * rates[toCurrency]).toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default ExchangeRates;
