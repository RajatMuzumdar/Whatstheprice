import React, { useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import isoCodes from "./isoCode.json";

const PPP = () => {
  const [usdSalary, setUsdSalary] = useState("");
  const [toCountryCode, setToCountryCode] = useState("IN");
  const [pppConversionFactor, setPppConversionFactor] = useState(null);
  const [countryList, setCountryList] = useState([]);
  const [equivalentSalary, setEquivalentSalary] = useState("");

  useEffect(() => {
    setCountryList(isoCodes);
  }, []);

  const [exchangeRate, setExchangeRate] = useState(null);

  // useEffect(() => {
  //   if (equivalentSalary && pppConversionFactor && exchangeRate) {
  //     setResult((equivalentSalary * pppConversionFactor));
  //   }
  // }, [equivalentSalary, pppConversionFactor, exchangeRate]);

  useEffect(() => {
    if (toCountryCode) {
      fetch(`https://api.purchasing-power-parity.com/?target=${toCountryCode}`)
        .then((response) => response.json())
        .then((data) => {
          setPppConversionFactor(data.ppp.pppConversionFactor);
        })
        .catch((error) => {
          console.log("Error fetching PPP conversion factor: ", error);
          setPppConversionFactor(null);
        });
    }
  }, [toCountryCode]);

  useEffect(() => {
    if (usdSalary && pppConversionFactor) {
      const equivalent = (usdSalary * pppConversionFactor).toFixed(2);
      setEquivalentSalary(equivalent);
    } else {
      setEquivalentSalary("");
    }
  }, [usdSalary, pppConversionFactor]);

  const handleUsdSalaryChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^\d+(\.\d{0,2})?$/.test(value)) {
      setUsdSalary(value);
    }
  };

  const handleCountryCodeChange = (e) => {
    setToCountryCode(e.target.value);
  };

  const getCountryName = (countryCode) => {
    const country = isoCodes.find((item) => item.Code === countryCode);
    return country ? country.Name : "";
  };
  function formatCurrency(number, currencyCode) {
    const formatter = new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: currencyCode,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return formatter.format(number);
  }

  return (
    <div>
      <Box
        sx={{
          maxWidth: "70ch",
          maxHeight: "50ch",
          padding: "3ch",
          margin: "10ch",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
          backgroundColor: "white",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              sx={{ m: 1, minWidth: "37ch" }}
              label="SALARY (USD)"
              type="text"
              value={usdSalary}
              onChange={handleUsdSalaryChange}
            />

            <FormControl sx={{ m: 1, minWidth: "37ch" }}>
              <InputLabel id="select-to">TO</InputLabel>
              <Select
                labelId="select-to"
                value={toCountryCode}
                label="TO"
                onChange={handleCountryCodeChange}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 48 * 4.5 + 8,
                      width: "25ch",
                    },
                  },
                }}
              >
                {countryList.map((item) => (
                  <MenuItem key={item.Code} value={item.Code}>
                    {item.Name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              sx={{ m: 1, minWidth: "37ch" }}
              label={`EQUIVALENT SALARY IN ${getCountryName(toCountryCode)}`}
              type="text"
              value={(Number(equivalentSalary)*Number(usdSalary)*100)}
              InputProps={{
                readOnly: true,
              }}
              
            />

            {/* {equivalentSalary && exchangeRate && (
              <Typography variant="subtitle1">
                You would earn approximately{" "}
                <strong>{formatCurrency(result)}</strong> in{" "}
                {getCountryName(toCountryCode)}.
              </Typography>
            )} */}
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};
export default PPP;
