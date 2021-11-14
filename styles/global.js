import React from "react";
import Theme from "./theme";

const GlobalStyles = () => (
  <style>
    {`
      body {
        color: #444;
        margin: 0;
        font-size: 14px;
        background-color: ${Theme.colors.offWhite};
        font-family: ${Theme.fonts.sans}
      }
      * {
        box-sizing: border-box;
      }
  `}
  </style>
);

export default GlobalStyles;
