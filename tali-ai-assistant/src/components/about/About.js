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
              alt="AI Speech Therapy"
            />
          </div>
          <div className="right-section col-md-6 pt-4 text-center text-md-start">
            <h1 className="about-head my-2">
              Empowering Speech Improvement with AI
            </h1>
            <p className="mt-3 lh-lg">
              ClearSpeak AI is designed to help individuals improve their pronunciation and speech fluency. Using AI-driven feedback, we provide personalized exercises and track your progress for a more effective learning journey.
            </p>

            <button className="watch-video read-more my-3">Learn More</button>
            <ul className="tick-list">
              <li>
                <CiCircleCheck className="check-mark" />
                Real-time pronunciation feedback
              </li>
              <li>
                <CiCircleCheck className="check-mark" />
                Personalized speech exercises
              </li>
              <li>
                <CiCircleCheck className="check-mark" />
                Progress tracking and performance reports
              </li>
              <li>
                <CiCircleCheck className="check-mark" />
                Multilingual support for diverse users
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
