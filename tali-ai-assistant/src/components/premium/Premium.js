import React from "react";
import "./Premium.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import icon from "../../images/10020.png";
import { pricingPlans } from "./PremiumList";
export default function Premium() {
  return (
    <div className="premium">
      <div className="container mt-5">
        <div className="row fac-head mb-5">
          <div className="col text-center">
            <h1 className="about-head">
              Pricing <span className="clip">Information?</span>
            </h1>
          </div>
        </div>
        <div className="row g-3">
          {pricingPlans.map((plan)=>(
            <div key={plan.id} className="col-9 mx-auto  col-md-6 col-lg-3 px-lg-2 mb-4 text-center">
            <Card className="py-4 each-plan mx-2">
              <img src={plan.icon} className="plan-icon" alt="" />
              <Card.Body>
                <Card.Title className="mb-3 fs-2 fw-semibold plan-type">
                  {plan.name}
                </Card.Title>
                <Button variant="light rounded-5 sec-title">{plan.price}</Button>
                <Card.Text className="plan-details mb-4 mt-3">
                  <ul className="color-red fw-light mt-2">
                    {plan.features.map((feature,index)=>(
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </Card.Text>
                <button className="watch-video read-more">Choose a Plan</button>
              </Card.Body>
            </Card>
          </div>
          ))}
          
        </div>
      </div>
    </div>
  );
}
