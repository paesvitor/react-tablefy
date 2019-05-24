import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import s from "./styles.css";

function DynamicTable(props) {
  const { data, config, className } = props;
  const { components, keys, labels = {}, styles = {}, onClickRow } = config;
  const rootClasses = classnames(className, s.tablefy);
  const dataKeys = keys || Object.keys(data[0]);

  const extractKey = (s, rowData, key) => {
    switch (typeof s) {
      case "string":
        const c = s.replace(/(^.*\(|\).*$)/g, "");
        return rowData[c === "self" ? key : c];
      case "function": {
        const params = getParams(s);
        const data = params.map(p => rowData[p]);
        return () => s(...data);
      }
    }
  };

  function getParams(func) {
    var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm;
    var ARGUMENT_NAMES = /([^\s,]+)/g;
    var fnStr = func.toString().replace(STRIP_COMMENTS, "");
    var result = fnStr
      .slice(fnStr.indexOf("(") + 1, fnStr.indexOf(")"))
      .match(ARGUMENT_NAMES);
    if (result === null) result = [];
    return result;
  }

  const renderTableCellContent = (key, cellData, rowData) => {
    if (components[key]) {
      const component = components[key];
      let props = {};
      Object.keys(component.props).map(e => {
        props[e] = extractKey(component.props[e], rowData, key);
      });
      return React.cloneElement(component, props);
    } else {
      return cellData;
    }
  };

  const setOnClickRowFunction = rowData => {
    const params = getParams(onClickRow);
    const data = params.map(p => rowData[p]);
    return onClickRow(...data);
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
                  {renderTableCellContent(key, row[key], row)}
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
    styles: PropTypes.objectOf(PropTypes.object)
  })
};

DynamicTable.defaultProps = {
  config: {
    components: {},
    labels: {}
  }
};

export default DynamicTable;
