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
    <div class="main-container">
      <p>{props.title}</p>
      {props.imgURL !== undefined && <img src={props.imgURL} alt="Grid Cell" />}

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
  );
}

export default GridCell;
