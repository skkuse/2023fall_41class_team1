import React from "react";
import "./GridRow.css"

const GridRow=(props)=>{

    
    return(
        <div class="row">
            {props.children}
        </div>
    )
}

export default GridRow;