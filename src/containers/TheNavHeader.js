import React from 'react'
import compactlogo from '../assets/images/logo-compact.png'
import logo from '../assets/images/logo.png'
import textlogo from '../assets/images/logo-text.png'
import { Link } from "react-router-dom";
export default function TheNavHeader() {
  return (
    <div className="nav-header">
      <div className="brand-logo">
        <Link to="/dashboard">
       
          <b className="logo-abbr">
            <img src={logo} alt />{" "}
          </b>
          <span className="logo-compact">
            <img src={compactlogo} alt />
          </span>
          <span className="brand-title">
            <img src={textlogo} alt />
          </span>
       
        </Link>
      </div>
    </div>
  );
}
