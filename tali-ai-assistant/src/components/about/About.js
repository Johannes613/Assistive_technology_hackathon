import React from "react";
import "./About.css";
import about_img from "../../images/10005.png";
import { CiCircleCheck } from "react-icons/ci";

export default function About() {
  return (
    <div className="about">
      <div className="container mx-auto">
        <div className="row">
          <div className="col-md-6 left-section">
            <img
              className="w-100 about-img"
              src={about_img}
              alt="AI Assistant"
            />
          </div>
          <div className="right-section col-md-6 pt-4 text-center text-md-start">
            <h1 className="about-head my-2">
              Empowering Your Creativity with AI-Driven Content Generation
            </h1>
            <p className="mt-3 lh-lg">
              Our AI-powered assistant helps you generate high-quality content effortlessly,  
              making idea creation, structuring, and refinement smoother than ever.
            </p>

            <button className="watch-video read-more my-3">Learn More</button>
            <ul className="tick-list">
              <li>
                <CiCircleCheck className="check-mark" />
                Intelligent content suggestions
              </li>
              <li>
                <CiCircleCheck className="check-mark" />
                AI-powered text enhancement
              </li>
              <li>
                <CiCircleCheck className="check-mark" />
                Adaptive learning for personalized results
              </li>
              <li>
                <CiCircleCheck className="check-mark" />
                Seamless integration with various platforms
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
