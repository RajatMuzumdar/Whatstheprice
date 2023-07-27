import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import data from "./historyData2.json";
import { Card, Typography } from "@mui/material";

const CurrencyGraph = ({ country }) => {
  const [filteredData, setFilteredData] = React.useState([]);

  React.useEffect(() => {
    // Find the data for the specified country
    const countryData = data.find((entry) => entry.Country_Name === country);

    if (!countryData) {
      console.error(`No data found for country : ${country}`);
      return;
    }

    // Filter the data by year
    const dataFilteredByYear = Object.entries(countryData)
      .filter(
        ([key]) =>
          key !== "Country_Name" && key !== "Country_Code" && key !== "2021"
      )
      .map(([key, value]) => ({
        year: key,
        value: value,
      }));
    setFilteredData(dataFilteredByYear);
  }, [country]);
  return (
    <Card
      sx={{
        maxWidth: "55ch",
        maxHeight: "50ch",
        padding: "2ch",
        margin: "5ch",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
      }}
    >
      <React.Fragment>
        <Typography variant="h6" align="center">
          {country} Currency Values Over Time
        </Typography>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart
            data={filteredData}
            margin={{ top: 20, right: 50, left: 10, bottom: 10 }}
          >
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="basis"
              dataKey="value"
              stroke="#8884d8"
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </React.Fragment>
    </Card>
  );
};

export default CurrencyGraph;
