// IMPORTING COMPONENTS

import "./App.css";
import React from "react";
import Conversion from "./Conversion";
import Navbar from "./Navbar";
// import PPP from "./test";
import Footer from "./footer";
// import background from "./background";
import ExchangeRateNotifier from "./ExchangeRateNotifier";
import CurrencyNews from "./rssfeed";
//MAIN APP
function App() {
  return (
    <div className="gradient_background">

      <Navbar />
      <Conversion />
      {/* <ExchangeRateNotifier />  */}
       <CurrencyNews/>
      {/* <PPP /> */}
      <Footer />
    </div>
  );
}

//EXPORTING APP
export default App;
