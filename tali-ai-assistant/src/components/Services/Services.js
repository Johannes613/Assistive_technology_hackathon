import React from "react";
import "./Services.css";
import Card from "react-bootstrap/Card";
import { services } from "./ServicesList";




export default function Services() {
  return (
    <div className="services pt-5 mt-5">
      <div className="container">
        <div className="row services fac-head mb-5">
          <div className="col d-flex align-items-center">
            <h1 className="tag px-3 mx-auto ">Why Choose <span className="clip">ChatSpeak AI?</span></h1>
          </div>
        </div>
        <div className="row services g-4 mt-5 pt-5">
          {services.map((service) => (
            <div className="col-lg-4 col-xl-3 col-sm-6 " key={service.id}>
              <Card className=" pt-5 ps-2 d-flex flex-column services justify-content-center align-items-center  gap-2 each-services">
                <Card.Img
                  variant="top"
                  className="serv-icon ms-4"
                  
                  src={service.icon}
                />
                
                <Card.Body>
                  <Card.Title className="fs-4">{service.title}</Card.Title>
                  <Card.Text className="serv-desc">{service.description}</Card.Text>
                  <p className="text-uppercase read-more-text"><span className="clip">Read More</span></p>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
