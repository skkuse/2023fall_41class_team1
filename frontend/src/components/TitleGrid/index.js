import React from "react";
import "./TitleGrid.css";

const TitleGrid = (props) => {
  return (
    <div className="grid-box">
        <p className="title-box">{props.title}</p>
        {props.children}
    </div>
  );
};

export default TitleGrid;
