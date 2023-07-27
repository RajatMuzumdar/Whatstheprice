import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import flags from "./flag.json";
import capital from "./capital.json";
import continent from "./continent.json";
import population from "./population.json";
import CountryDescription from "./CountryDescription";

const CountryCard = ({ countryName }) => {
  const country = Object.values(flags).find(
    (country) => country.name === countryName
  );

  if (!country) {
    return <Typography>No country found for {countryName}.</Typography>;
  }

  function getCapitalName(country) {
    for (let i = 0; i < capital.length; i++) {
      if (capital[i].country === country) {
        return capital[i].city;
      }
    }
    return "Unknown";
  }

  const CapitalName = getCapitalName(countryName);

  function getContinentName(country) {
    for (let i = 0; i < continent.length; i++) {
      if (continent[i].country === country) {
        return continent[i].continent;
      }
    }
    return "Unknown";
  }

  const ContinentName = getContinentName(countryName);

  function getPopulation(country) {
    for (let i = 0; i < population.length; i++) {
      if (population[i].country === country) {
        return population[i].population;
      }
    }
    return "Unknown";
  }

  const populationNum = getPopulation(countryName);

  return (
    <Card
      sx={{
        maxWidth: "55ch",
        maxHeight: "50ch",
        margin: "5ch",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
      }}
    >
      <CardContent style={{ position: "relative" }}>
        <Typography
          variant="h4"
          component="h2"
          style={{ position: "center", top: 10, left: 14, margin: "2px" }}
        >
          {country.name}
        </Typography>
        <CardMedia
          style={{
            height: "170px",
            width: "100%",
            backgroundSize: "contain",
            position: "absolute",
            top: 30,
            right: 10,
            left: -10,
            margin: "10px",
          }}
          image={country.image}
          // title={country.name}
        />
        <Typography variant="body1" style={{ marginTop: "120px",align:"center" }}>
          Capital: {CapitalName}
          <br />
          Continent: {ContinentName}
          <br />
          Population:{" "}
          {populationNum
            .toFixed(0)
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}{" "}
        </Typography>
        <CountryDescription countryName={countryName} />
      </CardContent>
    </Card>
  );
};

export default CountryCard;
