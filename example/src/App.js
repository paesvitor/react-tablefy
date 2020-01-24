import React, { Component } from "react";
import Table from "react-tablefy";
import data from "./example.json";
import Image from "./Image";

function App() {
  const handleClickTableRow = name => {
    console.log(name);
  };

  const tableConfig = {
    onClickRow: handleClickTableRow,
    components: {
      displayImage: <Image src="(self)" />
    }
  };

  return (
    <div>
      <Table data={data} config={tableConfig} />
    </div>
  );
}

export default App;
