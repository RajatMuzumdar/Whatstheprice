import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Card,
  Typography,
} from "@mui/material";
// import flags from "./flag.json";
import { tableCellClasses } from "@mui/material/TableCell";

const ConversionTable = ({ amount, rates }) => {
  return (
    <Card
      sx={{
        padding: "5ch",
        margin: "2rem",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
      }}
    >
      {" "}
      <Typography variant="h4" component="h2" align="center" gutterBottom>
        Current Rates
      </Typography>
      <Table
        sx={{
          m: 1,
          [`& .${tableCellClasses.root}`]: {
            borderBottom: "none",
          },
        }}
        style={{
          backgroundColor: "white",
        }}
      >
        <TableHead>
          <TableRow>
            {/* <TableCell style={{ fontSize: "25px", textAlign: "center", padding: "1ch" }}>
              Flag
            </TableCell> */}
            <TableCell style={{ fontSize: "25px", textAlign: "center" }}>
              Currency
            </TableCell>
            <TableCell style={{ fontSize: "25px", textAlign: "center" }}>
              Amount
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(rates).map(([currency, rate]) => {
            // const country = Object.values(flags).find(
            //   (country) => country.name === currency
            // );
            return (
              <TableRow key={currency}>
                {/* <TableCell style={{ fontSize: "17px", textAlign: "center", padding: "1ch" }}>
                  {country && (
                    <CardMedia
                      component="img"
                      height="30"
                      image={country.image}
                      alt={country.name}
                    />
                  )}
                </TableCell> */}
                <TableCell style={{ fontSize: "17px", textAlign: "center" }}>
                  {currency}
                </TableCell>
                <TableCell style={{ fontSize: "17px", textAlign: "center" }}>
                  {(amount * rate).toFixed(2)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Card>
  );
};

export default ConversionTable;
// import React from "react";
// import { CardMedia, Card } from "@mui/material";
// import flags from "./flag.json";

// const ConversionTable = ({ amount, rates }) => {
//   return (
//     <Card
//       sx={{
//         maxWidth: "40ch",
//         maxHeight: "50ch",
//         padding: "5ch",
//         margin: "10ch",
//         boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
//       }}
//     >
//       {Object.entries(rates).map(([currency, rate]) => {
//         const country = Object.values(flags).find(
//           (country) => country.name === currency
//         );
//         return (
//           <div
//             key={currency}
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               borderBottom: "1px solid black",
//               padding: "10px",
//               fontSize: "17px",
//             }}
//           >
//             {country && (
//               <CardMedia
//                 component="img"
//                 height="30"
//                 src={country.image}
//                 alt={country.name}
//                 style={{ marginRight: "10px" }}
//               />
//             )}
//             <div>{currency}</div>
//             <div>{(amount * rate).toFixed(3)}</div>
//           </div>
//         );
//       })}
//     </Card>
//   );
// };

// export default ConversionTable;
