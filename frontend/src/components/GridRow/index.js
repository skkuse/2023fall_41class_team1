import React from "react";
import "./GridRow.css"

const GridRow=(props)=>{

    
    return(
        <div className="row">
            {props.children}
        </div>
    )
}

export default GridRow;