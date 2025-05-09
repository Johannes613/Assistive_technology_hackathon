import React, { useContext } from "react";
import "./Hero.css";
import { GlobalContext } from "../../context/GlobalContext";
import SignIn from "../signIn/SignIn";
import { Link } from "react-router-dom";

export default function Hero() {
  const { currentUser } = useContext(GlobalContext);
  return (
    <div className="hero">
      <div className="container text-center d-flex align-items-center justify-content-center h-100">
        <div className="row">
          <h2 className="hero-head">
            AI-Powered <br /> Speech <span className="clip">Therapy</span> Assistant
          </h2>
          <p className="w-75 mb-4 mx-auto">
            Help students with speech impairments improve pronunciation with real-time AI feedback.
            Our smart assistant listens, analyzes, and suggests personalized therapy exercises—accessible through live mic or uploaded recordings.
          </p>
          <div className="btn-container">
            <button className="get-started py-2">{currentUser ? "Dashboard" : "Get Started"}</button>
            <button className="watch-video">Watch Demo</button>
          </div>
        </div>
      </div>
    </div>
  );
}
