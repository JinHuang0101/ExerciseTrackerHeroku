import React from "react";
import "../App.css";

function Footer() {
  const year = new Date().getFullYear();
  return <footer>{`Copyright © ${year} Jin Huang  `}</footer>;
}

export default Footer;
