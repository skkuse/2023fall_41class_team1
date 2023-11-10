import React from "react";
import "./TitleGrid.css";

const TitleGrid = (props) => {
  return (
    <div class="grid-box">
        <p class="title-box">{props.title}</p>
        {props.children}
    </div>
  );
};

export default TitleGrid;
