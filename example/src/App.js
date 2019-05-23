import React, { Component } from "react";
import Table from "react-tablefy";
import data from "./data.json";
import Image from "./Image";

export default class App extends Component {
  render() {
    const tableConfig = {
      components: {
        displayImage: {
          component: <Image />,
          useProp: "src"
        }
      },

      // keys: [],
      // labels: {},
      styles: {
        root: {
          // background: "#fff"
        }
      }
    };

    return (
      <div>
        <Table className="doidera" data={data} config={tableConfig} />
      </div>
    );
  }
}
