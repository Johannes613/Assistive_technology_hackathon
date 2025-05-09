import React from "react";
import team1 from "../../images/10029.png";
import "./OurTeam.css";
import { CiFacebook } from "react-icons/ci";
import { CiLinkedin } from "react-icons/ci";
import { CiTwitter } from "react-icons/ci";
import { teamMembers } from "./OurTeamList";

export default function OurTeam() {
  return (
    <div className="our-team">
      <div className="container">
      <div className=" mx-auto text-center text-lg-start mb-5 ">
          <h2 className="mb-5 text-center lh-lg">
            Have a look our <span className="clip">Team Members</span>
          </h2>
        </div>
        <div className="row">
          {teamMembers.map((member) => (
            <div
              className="col-10 mx-auto each-member mb-4 col-md-6 col-lg-3"
              key={member.id}
            >
              <img className="w-100" src={member.image} alt={member.name} />
              <div className="over-lay d-flex flex-column align-items-center justify-content-center">
                <h3 className="">{member.name}</h3>
                <span className="fw-semibold">{member.role}</span>
                <p className="fs-4 mx-auto">
                  <CiFacebook className="fw-bold social-team" />
                  <CiLinkedin className="social-team" />
                  <CiTwitter className="social-team" />
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
