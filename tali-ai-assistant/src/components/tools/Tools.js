import React from "react";
import "./Tools.css";
import icon1 from "../../images/10023.svg";
import { categories } from "./ToolsList";

export default function Tools() {
  return (
    <div className="tools">
      <div className="container">
        <div className=" mx-auto text-center text-lg-start mb-5 ">
          <h2 className="mb-5 lh-lg">
            60+ Powerful <span className="clip">Copywriting</span> Tools
          </h2>
        </div>
        <div className="row succ-list text-center g-4 g-xl-5">
          {categories.map((category) => (
            <div className="col-12 col-md-6 col-lg-3 ">
              <div className="child-first mx-3 d-flex flex-column gap-2  mx-sm-0">
                <img src={category.icon} className="tool-icon mb-1" alt="" />
                <h3>{category.title}</h3>
                <h6>{category.buttonText}</h6>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
