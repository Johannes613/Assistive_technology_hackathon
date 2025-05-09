import React, { useContext } from "react";
import "./Hero.css";
import { GlobalContext } from "../../context/GlobalContext";
import SignIn from "../signIn/SignIn";
import { Link } from "react-router-dom";

export default function Hero() {
  const { currentUser } = useContext(GlobalContext);
  return (
    <div className="hero">
      <div className="container text-center  d-flex align-items-center justify-content-center h-100">
        <div className="row">
          <h2 className="hero-head">
            AI-Powered <br /> Content <span className="clip">Generation</span>{" "}
            Assistant
          </h2>
          <p className="w-75 mb-4 mx-auto">
            Enhance your workflow with our intelligent assistant, designed to
            generate high-quality content tailored to your needs. Streamline
            your ideas and boost creativity with cutting-edge AI-powered
            solutions.
          </p>
          <div className="btn-container">
          <button className="get-started py-2">{currentUser?"Dashboard":"Get Started"}</button>
            <button className="watch-video">Watch Video</button>
          </div>
        </div>
      </div>
    </div>
  );
}
