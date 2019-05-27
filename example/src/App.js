import React, { Component } from "react";
import Table from "react-tablefy";
import data from "./data.json";
import Image from "./Image";

function App() {
  const genericMethod = (age, location) => {};

  const handleClickButton = name => {};

  const handleClickTableRow = fullName => {
    console.log(fullName);
  };

  const tableConfig = {
    alias: {
      fullName: "user.product.fullName"
    },
    onClickRow: handleClickTableRow,
    keys: ["fullName"]
  };

  return (
    <div>
      <Table data={data} config={tableConfig} />
    </div>
  );
}

export default App;
