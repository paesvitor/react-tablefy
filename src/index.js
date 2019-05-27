import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import s from "./styles.css";

function DynamicTable(props) {
  const { data, config, className } = props;
  const {
    components = {},
    keys,
    labels = {},
    styles = {},
    onClickRow,
    alias = {}
  } = config;
  const rootClasses = classnames(className, s.tablefy);
  const dataKeys = keys || Object.keys(data[0]);

  /**
   * Check the type of prop on custom component
   */
  const extractKey = (s, rowData, key) => {
    switch (typeof s) {
      case "string":
        const c = s.replace(/(^.*\(|\).*$)/g, "");
        return diveIntoObject(c === "self" ? key : getPureKey(c), rowData);
      case "function": {
        const params = getFunctionParams(s);
        const data = params.map(p => diveIntoObject(getPureKey(p), rowData));
        return () => s(...data);
      }
    }
  };

  /**
   * Returns all parameters passed to function on custom component
   */
  function getFunctionParams(func) {
    var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm;
    var ARGUMENT_NAMES = /([^\s,]+)/g;
    var fnStr = func.toString().replace(STRIP_COMMENTS, "");
    var result = fnStr
      .slice(fnStr.indexOf("(") + 1, fnStr.indexOf(")"))
      .match(ARGUMENT_NAMES);
    if (result === null) result = [];
    return result;
  }

  const setOnClickRowFunction = rowData => {
    const params = getFunctionParams(onClickRow);
    const data = params.map(p => diveIntoObject(getPureKey(p), rowData));
    return onClickRow(...data);
  };

  /**
   * Dives into a object and returns the value for a given path
   */
  const diveIntoObject = (key, rowData) => {
    return String(
      key.split(".").reduce(function(prev, curr) {
        return prev ? prev[curr] : null;
      }, rowData || self)
    );
  };

  const getPureKey = key => {
    return alias[key] || key;
  };

  const getKey = key => {
    return {
      path: alias[key] || key,
      component: key
    };
  };

  /**
   * MAIN: Renders the cell content
   */
  const renderTableCellContent = (key, rowData) => {
    const keyInformation = getKey(key);
    if (components[keyInformation.component]) {
      const component = components[keyInformation.component];
      let props = {};
      Object.keys(component.props).map(e => {
        props[e] = extractKey(component.props[e], rowData, keyInformation.path);
      });
      return React.cloneElement(component, props);
    } else {
      const a = diveIntoObject(keyInformation.path, rowData);
      console.log(a);
      return diveIntoObject(keyInformation.path, rowData);
    }
  };

  return (
    <section id="tablefy">
      <table style={{ ...styles.root }} className={rootClasses}>
        <thead style={{ ...styles.head }}>
          <tr style={{ ...styles.headRow }}>
            {dataKeys.map(key => (
              <th style={{ ...styles.headRowCell }} key={key} align="left">
                {labels[key] || key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody style={{ ...styles.body }}>
          {data.map((row, i) => (
            <tr
              onClick={() => onClickRow && setOnClickRowFunction(row)}
              style={{ ...styles.bodyRow }}
              key={`${row + i}`}
            >
              {dataKeys.map(key => (
                <td
                  style={{ ...styles.bodyRowCell }}
                  key={key}
                  component="th"
                  scope="row"
                >
                  {renderTableCellContent(key, row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

DynamicTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  className: PropTypes.string,
  config: PropTypes.shape({
    components: PropTypes.objectOf(PropTypes.object),
    labels: PropTypes.object,
    keys: PropTypes.arrayOf(PropTypes.string),
    styles: PropTypes.objectOf(PropTypes.object),
    alias: PropTypes.object
  })
};

DynamicTable.defaultProps = {
  config: {
    components: {},
    labels: {}
  }
};

export default DynamicTable;
