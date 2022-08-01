import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

export default function LandingPage() {

    return (
        <div className="landing">
      <div className="h1">
        <h1>WELCOME ON DOGS APP</h1>
      </div>
      <br />
      <div className="btn-container">
        <Link
          to="/home"
          style={{ textDecoration: "none" }}
        >
          <span className="btn">VIEW DOGS</span>
        </Link>
      </div>
    </div>
  );
}