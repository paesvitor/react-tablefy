import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import s from "./styles.css";

function DynamicTable(props) {
  const { data, config, className } = props;
  const { components, keys, labels = {}, styles = {} } = config;
  const rootClasses = classnames(className, s.tablefy);
  const dataKeys = keys || Object.keys(data[0]);

  const renderTableCellContent = (key, data) => {
    if (components[key]) {
      const useProp = components[key].useProp || "children";

      return React.cloneElement(components[key].component, {
        [`${useProp}`]: data
      });
    } else {
      return data;
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
            <tr style={{ ...styles.bodyRow }} key={`${row + i}`}>
              {dataKeys.map(key => (
                <td
                  style={{ ...styles.bodyRowCell }}
                  key={key}
                  component="th"
                  scope="row"
                >
                  {renderTableCellContent(key, row[key])}
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
  data: PropTypes.arrayOf(PropTypes.object),
  className: PropTypes.string,
  config: PropTypes.shape({
    components: PropTypes.objectOf(
      PropTypes.shape({
        component: PropTypes.node,
        useProp: PropTypes.string
      })
    ),
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
