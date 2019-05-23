import React, { Component } from "react";

import Table from "react-tablefy";
import data from "./data.json";

export default class App extends Component {
  render() {
    return (
      <div>
        <Table data={data} />
      </div>
    );
  }
}
