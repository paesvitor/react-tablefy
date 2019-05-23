import React from "react";

function Image(props) {
  return (
    <img
      {...props}
      style={{ width: "50px", height: "50px", borderRadius: "50%" }}
    />
  );
}

export default Image;
