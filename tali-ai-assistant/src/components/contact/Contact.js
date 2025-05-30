import React from "react";
import "./Contact.css";
import Button from "react-bootstrap/Button";
import { FaArrowRight } from "react-icons/fa";
import { FaLocationPin } from "react-icons/fa6";
import { CiMail } from "react-icons/ci";
import { FaPhoneAlt } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa6";
import { CiTwitter } from "react-icons/ci";
import { SlSocialLinkedin } from "react-icons/sl";
import { FiGithub } from "react-icons/fi";
import { Form } from "react-bootstrap";

export default function Contact() {
  return (
    <div className="contact">
      <div className="contact-head d-flex flex-column gap-4 align-items-center justify-content-center">
        <p>Get Started</p>
        <h1 className="text-center">
          Let's Make Something <br /> Great Together
        </h1>
        <Button variant="light px-4 py-2 rounded-5 btn-contact">
          Contact Us <FaArrowRight className="arrow-btn" />
        </Button>
      </div>
      <div className="container mb-5">
        <div className="row g-3 pt-5 mt-5">
          <div className="col-12 text-center text-lg-start col-lg-6 d-flex flex-column justify-content-center gap-4">
            <h1>
              Get in <span className="clip">Touch</span>
            </h1>
            <p>
              Have questions or feedback? Reach out to the AI ProHelper team—we'd love to hear from you and help you improve your speech with smart AI tools.
            </p>
            <p>
              <FaLocationPin /> Abu Dhabi University, Abu Dhabi
            </p>
            <p>
              <CiMail /> clearspeakai712@gmail.com
            </p>
            <p>
              <FaPhoneAlt /> +971 54 394 8653
            </p>
            <div className="social-media d-flex gap-1">
              <button className="btn">
                <a href="https://github.com/Johannes613" target="_blank" rel="noopener noreferrer">
                  <FiGithub className="icons" />
                </a>
              </button>
              <button className="btn">
                <a href="https://www.linkedin.com/in/yohannis-adamu-1837832b9" target="_blank" rel="noopener noreferrer">
                  <SlSocialLinkedin className="icons" />
                </a>
              </button>
              <button className="btn">
                <a href="https://www.facebook.com/share/162Qps5sq2/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer">
                  <FaFacebookF className="icons" />
                </a>
              </button>
              <button className="btn">
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <CiTwitter className="icons" />
                </a>
              </button>
            </div>
          </div>
          <div className="col-12 col-lg-6 contact-form">
            <form className="d-flex flex-column justify-content-center gap-4 for">
              <div className="form-sections d-flex gap-3 mb-2 mt-2">
                <Form.Control
                  className="inputs py-2"
                  size="lg"
                  type="text"
                  placeholder="Full Name"
                  required
                />
              </div>
              <div className="form-sections d-flex gap-3 mb-3">
                <Form.Control
                  className="inputs py-2"
                  size="lg"
                  type="email"
                  placeholder="Email Address"
                  required
                />
              </div>
              <Form.Control
                className="inputs py-2"
                size="lg"
                type="tel"
                placeholder="Phone Number"
                required
              />
              <Form.Control
                className="inputs"
                placeholder="Please write your message here"
                as="textarea"
                rows={5}
              />
              <Button
                variant="primary"
                className="get-started contact-submit py-2"
                type="submit"
              >
                Submit
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
