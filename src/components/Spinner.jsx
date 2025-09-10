import React from "react";

const Spinner = ({ styles }) => {
  return (
    <div style={styles.overlay}>
      <div style={styles.spinner}></div>
    </div>
  );
};

export default Spinner;