import React, { Component } from "react";
import Table from "react-tablefy";
import data from "./data.json";
import Image from "./Image";

function App() {
  const genericMethod = (age, location) => {};

  const handleClickButton = name => {};

  const handleClickTableRow = (name, age) => {
    console.log(name);
  };

  const tableConfig = {
    components: {
      displayImage: <Image src="(self)" alt="(name)" />,
      name: <button children="(self)" />
    },
    onClickRow: handleClickTableRow,

    labels: {
      displayImage: "Image"
    }
  };

  return (
    <div>
      <Table data={data} config={tableConfig} />
    </div>
  );
}

export default App;
