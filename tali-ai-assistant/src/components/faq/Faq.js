import React from "react";
import "./Faq.css";
import Accordion from "react-bootstrap/Accordion";
import { faqData } from "./faqList";

export default function Faq() {
  return (
    <div className="faq">
      <div className="container">
        <div className=" mx-auto text-center text-lg-start mb-5 ">
          <h2 className="mb-5 text-center lh-lg">
            Frequently Asked <span className="clip">Questions?</span>
          </h2>
        </div>
        <Accordion
          className=" col-lg-8 col-11 mx-auto"
          defaultActiveKey="0"
        >
          {faqData.map((faq, index) => (
            <Accordion.Item
              className="accordion-faq mb-3"
              eventKey={index.toString()}
              key={faq.id}
            >
              <Accordion.Header className="accordion-faq">
                {faq.question}
              </Accordion.Header>
              <Accordion.Body className="accordion-faq">
                {faq.answer}
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
