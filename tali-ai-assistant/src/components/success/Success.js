import React from "react";
import "./Success.css";

export default function Success() {
  return (
    <div className="success">
      <div className="container">
        <div className="row succ-list text-center g-4">
          <div className="col-12 mb-3 col-lg-4 mx-auto text-center text-lg-start">
            <h2 className="mb-3 lh-md">Empowering Content Creation with AI</h2>
            <button className="get-started mt-3">Get Started</button>
          </div>

          <div className="col-12 col-md-3 col-lg-2">
            <div
              className="child-first mx-3 mx-sm-0"
              style={{ background: "#E2E2fc", color: "#6b6bd4" }}
            >
              <h1>10+</h1>
              <h6 style={{ color: "black" }}>Trainees</h6>
            </div>
          </div>

          <div className="col-12 col-md-3 col-lg-2">
            <div
              className="child-first mx-3 mx-sm-0"
              style={{ background: "#B9dcff", color: "#0984fc" }}
            >
              <h1>92%</h1>
              <h6 style={{ color: "black" }}>Accuracy</h6>
            </div>
          </div>

          <div className="col-12 col-md-3 col-lg-2">
            <div
              className="child-first mx-3 mx-sm-0"
              style={{ background: "#c2fcec", color: "#00b894" }}
            >
              <h1>87%</h1>
              <h6 style={{ color: "black" }}>Satisfaction</h6>
            </div>
          </div>

          <div className="col-12 col-md-3 col-lg-2">
            <div
              className="child-first mx-3 mx-sm-0"
              style={{ background: "#ffb4da", color: "#e17055" }}
            >
              <h1>40+</h1>
              <h6 style={{ color: "black" }}>Languages</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
