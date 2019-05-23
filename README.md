# react-tablefy

> A simple React dynamic table with configurations

[![NPM](https://img.shields.io/npm/v/react-tablefy.svg)](https://www.npmjs.com/package/react-tablefy) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

- With NPM

```bash
npm install --save react-tablefy
```

- With Yarn

```bash
yarn add react-tablefy
```

## Usage

Let's say you have an array of objects and you want to display this into a table

- data.json

```json
[
  {
    "displayImage": "https://vignette.wikia.nocookie.net/gameofthrones/images/1/1f/Night_King_BTW.jpg/revision/latest?cb=20171013162809",
    "name": "Night King",
    "age": 10000,
    "location": "Beyond the wall"
  },

  {
    "displayImage": "https://vignette.wikia.nocookie.net/gameofthrones/images/4/4c/JonSnowTheBells.PNG/revision/latest/scale-to-width-down/329?cb=20190513080305",
    "name": "Jon Snow",
    "age": 23,
    "location": "The Wall"
  }
]
```

```jsx
import React, { Component } from "react";
import data from "./data.json";

import Table from "react-tablefy";

class Example extends Component {
  render() {
    return <Table data={data} />;
  }
}
```

This will output:

![alt text](https://user-images.githubusercontent.com/17584531/58286462-2c5e2300-7d85-11e9-9b26-2e19c6ab3df4.png)

But... The field displayName is an image, and it's rendering as an String, let's say you want to display an image component to this field.

- 1: Create a config object
- 1.1: Create a components object
- 1.2: Inside components object set the key you want to display a custom object (in our example, **displayImage**) with a component key
- 1.3 We will set the src value dynamically. The value was rendering as a string, now, we want to set this value as the value inside some prop, in our case, we want to set this on src, just add a key called useProp with "src" value.

Note: useProp is optional, omit this key will set the value as children prop

- 2: Set this object to config prop

```jsx
import React, { Component } from "react";
import data from "./data.json";

import Table from "react-tablefy";

import Image from "any-image-component";

class Example extends Component {
  render() {
    // Step 1
    const tableConfig = {
      components: {
        // Steps 1.2 & 1.3
        displayImage: {
          component: <Image />,
          useProp: "src"
        }
      }
    };

    // Step 2
    return <Table data={data} config={tableConfig} />;
  }
}
```

This will output:

![alt text](https://user-images.githubusercontent.com/17584531/58287486-85c75180-7d87-11e9-94a7-0a367fbafd1d.png)

## Config Object

```js
const tableConfig = {
  components: {
    // Custom components for a given key
    displayImage: {
      // Component
      component: <Image />,

      // Prop to the value
      useProp: "src"
    }
  },

  // Custom names to table head keys
  labels: {
    displayImage: "Image"
  },

  // If you don't want to show all data set object keys you can choose which fields you want to show, just add their names on the keys array

  // This will show only displayName and age on table
  keys: ["displayName", "age"]
};
```

## Styling

- 1 - With styled components

```jsx
import styled from "styled-components";
import Table from "react-tablefy";

const StyledTable = styled(Table)`
  // Your custom styles
  tr {
    background: red;
  }
`;

class WithStyledComponent extends Component {
  render() {
    return <StyledTable data={data} />;
  }
}
```

- 2 - With inline css (style object on config)

```jsx
import React, { Component } from "react";
import Table from "react-tablefy";

class WithInlineCSS extends Component {
  render() {
    // Step 1
    const tableConfig = {
      styles: {
        // Available styles
        root: {},

        head: {},
        headRow: {},
        headRowCell: {},

        body: {},
        bodyRow: {},
        bodyRowCell: {}
      }
    };

    // Step 2
    return <Table data={data} config={tableConfig} />;
  }
}
```

- 3 - With custom class

```jsx
import React, { Component } from "react";
import Table from "react-tablefy";
import styles from './styles.css'

class WithInlineCSS extends Component {
  render() {
    return <Table
      className={styles.customClass}
      data={data}
    />;
    };
  }
}
```

## TODO

- Improve writing of this documentation (my english sucks haha)

## License

MIT © [paesvitor](https://github.com/paesvitor)
