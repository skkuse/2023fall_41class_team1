import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import "./GridCell.css";

GridCell.propTypes = {
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
};

function GridCell(props) {
  const { sx, ...other } = props;

  return (
    <div className="main-container">
      <div className="upper-content">
        <p>{props.title}</p>
      </div>

      <div className="lower-content">
        {props.imgurl !== undefined && <img src={props.imgurl} alt="Grid Cell" />}
        <Box
          sx={{
            bgcolor: (theme) =>
              theme.palette.mode === "dark" ? "#101010" : "#fff",
            color: (theme) =>
              theme.palette.mode === "dark" ? "grey.300" : "grey.800",
            border: "1px solid",
            borderColor: (theme) =>
              theme.palette.mode === "dark" ? "grey.800" : "grey.300",
            p: 1,
            m: 1,
            borderRadius: 2,
            fontSize: "0.875rem",
            fontWeight: "700",
            ...sx,
          }}
          {...other}
        >
          {props.content}
        </Box>
      </div>
    </div>
  );
}

export default GridCell;
