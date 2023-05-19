import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  FormControl,
  InputLabel,
  Chip,
  Select,
  MenuItem,
  TextField,
  Button,
  Typography,
  Grid,
  Box,
  Card,
} from "@mui/material";
import CountryCard from "./CountryCard";
import Currcode from "./Currcode.json";
import ConversionTable from "./ConversionTable";
import CurrencyGraph from "./CurrencyGraph";
import _ from "lodash";
import jsonData from "./currencyData.json";
import Multipleamt from "./multipleamt";

export default function Conversion() {
  const [amount, setAmount] = useState("7");
  const [fromCurrency, setFromCurrency] = useState("GBP");
  const [toCurrency, setToCurrency] = useState("INR");
  const [currencies, setCurrencies] = useState([]);
  const [result, setResult] = useState("");
  const [rate, setRate] = useState(null);
  const amtInp = useRef(null);
  const rsltInp = useRef(null);
  const [lastEditedField, setLastEditedField] = useState(null);

  useEffect(() => {
    const currencies = Currcode.map((item) => item.currency_code);
    setCurrencies(currencies);
    setFromCurrency(currencies[212]);
    setToCurrency(currencies[92]);
  }, []);

  const debouncedRate = useRef(
    _.debounce((value) => {
      setRate(value);
    }, 500)
  ).current;

  useEffect(() => {
    if (fromCurrency && toCurrency) {
      fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
        .then((response) => response.json())
        .then((data) => {
          debouncedRate(data.rates[toCurrency]);
        });
    }
  }, [fromCurrency, toCurrency, debouncedRate]);

  useEffect(() => {
    if (amount && rate && lastEditedField === "amount") {
      setResult(amount * Number(rate).toFixed(4));
    } else if (rate && lastEditedField === "result") {
      setAmount(result / Number(rate).toFixed(4));
    }
  }, [amount, rate, lastEditedField, result]);

  const handleAmountChange = useCallback((e) => {
    const value = e.target.value;
    if (value === "" || /^\d+(\.\d{0,2})?$/.test(value)) {
      setAmount(value);
      setLastEditedField("amount");
    }
  }, []);

  const handleResultChange = useCallback((e) => {
    const value = e.target.value;
    if (value === "" || /^\d+(\.\d{0,2})?$/.test(value)) {
      setResult(value);
      setLastEditedField("result");
    }
  }, []);

  useEffect(() => {
    if (rate) {
      if (lastEditedField === "amount") {
        setResult(amount * Number(rate).toFixed(4));
      } else if (lastEditedField === "result") {
        setAmount(result / Number(rate).toFixed(4));
      }
    }
  }, [fromCurrency, toCurrency, rate, amount, lastEditedField, result]);

  const [rates, setRates] = useState({});

  useEffect(() => {
    if (fromCurrency) {
      fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
        .then((response) => response.json())
        .then((data) => {
          setRates({
            EUR: data.rates.EUR,
            GBP: data.rates.GBP,
            JPY: data.rates.JPY,
            CNY: data.rates.CNY,
            AUD: data.rates.AUD,
            SGD: data.rates.SGD,
            DKK: data.rates.DKK,
            AED: data.rates.AED,
            RWF: data.rates.RWF,
            CHF: data.rates.CHF,
            
          });
        });
    }
  }, [fromCurrency]);

  function getCurrencyName(jsonData, currencyCode) {
    return jsonData[currencyCode].name;
  }
  const tocurrencyName = getCurrencyName(jsonData, toCurrency);
  const fromcurrencyName = getCurrencyName(jsonData, fromCurrency);

  function getCountryName(currencyCode) {
    for (let i = 0; i < Currcode.length; i++) {
      if (Currcode[i].currency_code === currencyCode) {
        return Currcode[i].country;
      }
    }
    return "Unknown";
  }

  const toCountryName = getCountryName(toCurrency);

  const fromCountryName = getCountryName(fromCurrency);

  function getCurrencySymbol(jsonData, currencyCode) {
    return jsonData[currencyCode].symbol;
  }
  const tocurrencySymbol = getCurrencySymbol(jsonData, toCurrency);
  const fromcurrencySymbol = getCurrencySymbol(jsonData, fromCurrency);

  return (
    <div>
      <Grid
        container
        spacing={2}
        sx={{ justifyContent: "center", paddingTop: "20vh" }}
      >
        <Grid item xs={2}>
          <CountryCard countryName={fromCountryName} />
        </Grid>
        <Grid item xs={7}>
          <Box display="flex" justifyContent="center">
            <Card
              sx={{
                maxWidth: "80ch",
                maxHeight: "70ch",
                alignContent: "Center",
                alignSelf: "Center",
                padding: "5ch",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
              }}
            >
              {" "}
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  fontFamily: "Monospace",
                  fontSize: "2.5rem",
                  textShadow: "2px 2px 2px rgba(0, 0, 0, 0.2)",
                }}
              >
                {amount} {fromcurrencyName} to {tocurrencyName}
              </Typography>
              <br />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <FormControl sx={{ m: 1, minWidth: "37ch" }}>
                    <InputLabel id="select-from">FROM</InputLabel>
                    <Select
                      labelId="select-from"
                      value={fromCurrency}
                      label="FROM"
                      onChange={(e) => setFromCurrency(e.target.value)}
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

                  <div>
                    <Chip
                      label="GBP"
                      onClick={(e) => setFromCurrency("GBP")}
                      sx={{
                        "&": { backgroundColor: "white" },
                        "&:hover": { visibility: "visible" },
                      }}
                    />
                    <Chip
                      label="USD"
                      onClick={(e) => setFromCurrency("USD")}
                      sx={{
                        "&": { backgroundColor: "white" },
                        "&:hover": { visibility: "visible" },
                      }}
                    />
                    <Chip
                      label="INR"
                      onClick={(e) => setFromCurrency("INR")}
                      sx={{
                        "&": { backgroundColor: "white" },
                        "&:hover": { visibility: "visible" },
                      }}
                    />
                  </div>
                  <TextField
                    sx={{ m: 1, minWidth: "37ch" }}
                    label="AMOUNT"
                    type="text"
                    value={Number(amount)}
                    ref={amtInp}
                    onChange={handleAmountChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControl sx={{ m: 1, minWidth: "37ch" }}>
                    <InputLabel id="select-to">TO</InputLabel>
                    <Select
                      labelId="select-to"
                      value={toCurrency}
                      label="TO"
                      onChange={(e) => setToCurrency(e.target.value)}
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

                  <div
                    sx={{
                      maxWidth: "84ch",
                      maxHeight: "40ch",
                      alignContent: "Center",
                    }}
                  >
                    <Chip
                      label="INR"
                      onClick={(e) => setToCurrency("INR")}
                      sx={{
                        "&": { backgroundColor: "white" },
                        "&:hover": { visibility: "visible" },
                      }}
                    />
                    <Chip
                      label="USD"
                      onClick={(e) => setToCurrency("USD")}
                      sx={{
                        "&": { backgroundColor: "white" },
                        "&:hover": { visibility: "visible" },
                      }}
                    />
                    <Chip
                      label="GBP"
                      onClick={(e) => setToCurrency("GBP")}
                      sx={{
                        "&": { backgroundColor: "white" },
                        "&:hover": { visibility: "visible" },
                      }}
                    />
                  </div>

                  <TextField
                    sx={{ m: 1, minWidth: "37ch" }}
                    label="RESULT"
                    type="text"
                    ref={rsltInp}
                    value={Number(result)}
                    onChange={handleResultChange}
                  />
                </Grid>
              </Grid>
              {result && (
                <>
                  <Typography variant="h6">
                    <Box fontWeight="bold" display="inline">
                      {fromcurrencySymbol}
                    </Box>{" "}
                    {amount} is{" "}
                    <Box fontWeight="bold" display="inline">
                      {tocurrencySymbol}
                    </Box>{" "}
                    {result}{" "}
                  </Typography>
                  <Typography>
                    The exchangerate of {tocurrencyName} from {fromcurrencyName}{" "}
                    is {Number(rate).toFixed(4)}
                  </Typography>
                </>
              )}
            </Card>
          </Box>
        </Grid>{" "}
        <Grid item xs={2}>
          <CountryCard countryName={toCountryName} />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <CurrencyGraph country={fromCountryName} />
        </Grid>

        <Grid item xs={12} sm={6}>
          <CurrencyGraph country={toCountryName} />
        </Grid>
      </Grid>

      <Card
        style={{
          margin: "10ch",
          maxWidth: "145ch",
          paddingLeft: "3ch",
          paddingRight: "3ch",
          paddingBottom: "3ch",
          backgroundColor: "white",
          border: "1px soft black",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
          borderRadius: "10px",
        }}
      >
        {" "}
        <Typography
          variant="h5"
          style={{ fontSize: "20px", textAlign: "center", padding: "2vh" }}
        >
          Popular Conversion
        </Typography>
        <Box
          sx={{
            textAlign: "center",
            padding: "1rem",
            "@media (min-width: 400rem)": {
              display: "flex",
              justifyContent: "center",
              height: "20ch",
            },
          }}
        >
          <br />

          <Grid container spacing={1}>
            <Grid item xs={12} sm={6} md={6} lg={3} xl={2}>
              <Button
                fullWidth
                variant="outlined"
                style={{ marginBottom: "1ch" }}
                onClick={(event) => [
                  setAmount("1"),
                  setFromCurrency("GBP"),
                  setToCurrency("USD"),
                  setLastEditedField("amount"),
                ]}
              >
                GBP to USD
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={3} xl={2}>
              <Button
                fullWidth
                variant="outlined"
                style={{ marginBottom: "1ch" }}
                onClick={(event) => [
                  setAmount("1"),
                  setFromCurrency("CNY"),
                  setToCurrency("GBP"),
                  setLastEditedField("amount"),
                ]}
              >
                CNY to GBP
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={3} xl={2}>
              <Button
                fullWidth
                variant="outlined"
                style={{ marginBottom: "1ch" }}
                onClick={(event) => [
                  setAmount("1"),
                  setFromCurrency("CAD"),
                  setToCurrency("JPY"),
                  setLastEditedField("amount"),
                ]}
              >
                CAD to JPY
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={3} xl={2}>
              <Button
                fullWidth
                variant="outlined"
                style={{ marginBottom: "1ch" }}
                onClick={(event) => [
                  setAmount("1"),
                  setFromCurrency("USD"),
                  setToCurrency("EUR"),
                  setLastEditedField("amount"),
                ]}
              >
                USD to EUR
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={3} xl={2}>
              <Button
                fullWidth
                variant="outlined"
                style={{ marginBottom: "1ch" }}
                onClick={(event) => [
                  setAmount("1"),
                  setFromCurrency("INR"),
                  setToCurrency("USD"),
                  setLastEditedField("amount"),
                ]}
              >
                INR to USD
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={3} xl={2}>
              <Button
                fullWidth
                variant="outlined"
                style={{ marginBottom: "1ch" }}
                onClick={(event) => [
                  setAmount("1"),
                  setFromCurrency("CHF"),
                  setToCurrency("USD"),
                  setLastEditedField("amount"),
                ]}
              >
                CHF to USD
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={3} xl={2}>
              <Button
                fullWidth
                variant="outlined"
                style={{ marginBottom: "1ch" }}
                onClick={(event) => [
                  setAmount("1"),
                  setFromCurrency("CAD"),
                  setToCurrency("THB"),
                  setLastEditedField("amount"),
                ]}
              >
                CAD to THB
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={3} xl={2}>
              <Button
                fullWidth
                variant="outlined"
                style={{ marginBottom: "1ch" }}
                onClick={(event) => [
                  setAmount("1"),
                  setFromCurrency("GBP"),
                  setToCurrency("ARS"),
                  setLastEditedField("amount"),
                ]}
              >
                GBP to ARS
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={3} xl={2}>
              <Button
                fullWidth
                variant="outlined"
                style={{ marginBottom: "1ch" }}
                onClick={(event) => [
                  setAmount("1"),
                  setFromCurrency("INR"),
                  setToCurrency("HKD"),
                  setLastEditedField("amount"),
                ]}
              >
                INR to HKD
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={3} xl={2}>
              <Button
                fullWidth
                variant="outlined"
                style={{ marginBottom: "1ch" }}
                onClick={(event) => [
                  setAmount("1"),
                  setFromCurrency("JPY"),
                  setToCurrency("AUD"),
                  setLastEditedField("amount"),
                ]}
              >
                JPY to AUD
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={3} xl={2}>
              <Button
                fullWidth
                variant="outlined"
                style={{ marginBottom: "1ch" }}
                onClick={(event) => [
                  setAmount("1"),
                  setFromCurrency("CNY"),
                  setToCurrency("KRW"),
                  setLastEditedField("amount"),
                ]}
              >
                CNY to KRW
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={3} xl={2}>
              <Button
                fullWidth
                variant="outlined"
                style={{ marginBottom: "1ch" }}
                onClick={(event) => [
                  setAmount("1"),
                  setFromCurrency("JPY"),
                  setToCurrency("INR"),
                  setLastEditedField("amount"),
                ]}
              >
                JPY to INR
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={3} xl={2}>
              <Button
                fullWidth
                variant="outlined"
                style={{ marginBottom: "1ch" }}
                onClick={(event) => [
                  setAmount("1"),
                  setFromCurrency("ISK"),
                  setToCurrency("GBP"),
                  setLastEditedField("amount"),
                ]}
              >
                ISK to GBP
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={3} xl={2}>
              <Button
                fullWidth
                variant="outlined"
                style={{ marginBottom: "1ch" }}
                onClick={(event) => [
                  setAmount("1"),
                  setFromCurrency("USD"),
                  setToCurrency("VND"),
                  setLastEditedField("amount"),
                ]}
              >
                USD to VND
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={3} xl={2}>
              <Button
                fullWidth
                variant="outlined"
                style={{ marginBottom: "1ch" }}
                onClick={(event) => [
                  setAmount("1"),
                  setFromCurrency("ILS"),
                  setToCurrency("PEN"),
                  setLastEditedField("amount"),
                ]}
              >
                ILS to PEN
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={3} xl={2}>
              <Button
                fullWidth
                variant="outlined"
                style={{ marginBottom: "1ch" }}
                onClick={(event) => [
                  setAmount("1"),
                  setFromCurrency("OMR"),
                  setToCurrency("JMD"),
                  setLastEditedField("amount"),
                ]}
              >
                OMR to JMD
              </Button>
            </Grid>{" "}
            <Grid item xs={12} sm={6} md={6} lg={3} xl={2}>
              <Button
                fullWidth
                variant="outlined"
                style={{ marginBottom: "1ch" }}
                onClick={(event) => [
                  setAmount("1"),
                  setFromCurrency("DKK"),
                  setToCurrency("VND"),
                  setLastEditedField("amount"),
                ]}
              >
                DKK to VND
              </Button>
            </Grid>{" "}
            <Grid item xs={12} sm={6} md={6} lg={3} xl={2}>
              <Button
                fullWidth
                variant="outlined"
                style={{ marginBottom: "1ch" }}
                onClick={(event) => [
                  setAmount("1"),
                  setFromCurrency("CHF"),
                  setToCurrency("QAR"),
                  setLastEditedField("amount"),
                ]}
              >
                CHF to QAR
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Card>

      <br />

      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Multipleamt fromCurrency={fromCurrency} toCurrency={toCurrency} />{" "}
        </Grid>
        <Grid item xs={12} sm={4}>
          <ConversionTable amount={amount} rates={rates} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Multipleamt fromCurrency={toCurrency} toCurrency={fromCurrency} />
        </Grid>
      </Grid>
    </div>
  );
}
