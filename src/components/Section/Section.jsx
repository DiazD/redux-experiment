import React from "react";
import "./Section.css";

const Section = ({ header, children }) => {
  return (
    <div className="section-container">
      <h4 className="section-header">{header}</h4>
      {children}
    </div>
  );
};

export default Section;
