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
import Table from "react-tablefy";
import data from "./data.json";

class SimpleTableExample extends Component {
  render() {
    return <Table data={data} />;
  }
}
```

This will output:

![alt text](https://user-images.githubusercontent.com/17584531/58286462-2c5e2300-7d85-11e9-9b26-2e19c6ab3df4.png)

But... The field displayName is an image, and it's rendering as an String, let's say you want to display an image component to this field.

- 1: Create a config object.

- 1.1: Create a components object inside config.

- 1.2: Inside components object set the key you want to display a custom Component (in our example, **displayImage**).

- 1.3: We want to show the value of this key **(displayImage)** for this row inside the src prop. We need to say that prop **src** gets a value of **displayImage** using tablefy variables (tablefy understands that the variables are within parentheses, then you can access the value of any key within that line, using paranteses).
- 1.3.1: variable **(self)** returns the current value for the key you are customizing. In this example, it takes the value of displayImage for that line and places it inside src.
- 1.3.2: variable **(name)** will get the value of **name** key for this row and place inside **alt** prop.

- 2: Set this object to config prop.

```jsx
import React, { Component } from "react";
import data from "./data.json";
import Table from "react-tablefy";
import Image from "./any-image-component";

class TableWithCustomComponents extends Component {
  render() {
    // Step 1
    const tableConfig = {
      // Step 1.1
      components: {
        // Steps 1.2, 1.3, 1.3.1 & 1.3.2
        displayImage: <Image src="(self)" alt="(name)" />
      }
    };

    // Step 2
    return <Table data={data} config={tableConfig} />;
  }
}
```

This will output:

![alt text](https://user-images.githubusercontent.com/17584531/58287486-85c75180-7d87-11e9-94a7-0a367fbafd1d.png)

## Actions

### Components actions

You can pass functions to custom Components, argument names has to be the same as the keys you want to retrieve value.

1 - Create a function with argument names same as the key values you want to get.

1.1 - In this example, we will print the name of the character present in the table row.

1.2 - Tablefy will search for the key **name** in the row and pass it to your function.

```jsx
import React, { Component } from "react";
import data from "./data.json";
import Table from "react-tablefy";
import Image from "./any-image-component";

class TableWithActions extends Component {
  handleClickTableImage(name) {
    console.log(name);
  }

  render() {
    const tableConfig = {
      components: {
        displayImage: (
          <Image onClick={handleClickTableImage} src="(self)" alt="(name)" />
        )
      }
    };

    return <Table data={data} config={tableConfig} />;
  }
}
```

### Row actions

Let's say you want to perform an action by clicking on a row in the table.

1 - add a key called **onClickRow** to your configuration object assigning it the function you want to call, using the same principles described in the above example.

1.1 - The function will search for a key call **name** present on the row and set this value as parameter on your function.

```jsx
import React, { Component } from "react";
import data from "./data.json";
import Table from "react-tablefy";
import Image from "./any-image-component";

class TableWithRowAction extends Component {
  handleClickOnTableRow(name) {
    console.log(name);
  }

  render() {
    const tableConfig = {
      components: {
        displayImage: <Image src="(self)" alt="(name)" />
      },

      // Step 1
      onClickRow: handleClickOnTableRow
    };

    return <Table data={data} config={tableConfig} />;
  }
}
```

## Config Object

```js
const tableConfig = {
  components: {
    // Custom components for a given key
    displayImage: <Image src="(self)" />
  },

  // Custom names to table head keys
  labels: {
    displayImage: "Image"
  },

  // If you don't want to show all data set object keys
  // you can choose which fields you want to show
  // just add their names on the keys array
  keys: ["displayName", "age"]
  // This will show only displayName and age on table
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
