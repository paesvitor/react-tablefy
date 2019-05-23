import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.css";

function DynamicTable(props) {
  const { data, config } = props;
  const { components, keys, labels = {} } = config;

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
    <section id="tablefy" className={styles.tablefy}>
      <table>
        <thead>
          <tr>
            {dataKeys.map(key => (
              <th key={key} align="left">
                {labels[key] || key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={`${row + i}`}>
              {dataKeys.map(key => (
                <td key={key} component="th" scope="row">
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
  config: PropTypes.shape({
    components: PropTypes.objectOf(
      PropTypes.shape({
        component: PropTypes.node,
        useProp: PropTypes.string
      })
    ),
    labels: PropTypes.object,
    keys: PropTypes.arrayOf(PropTypes.string)
  })
};

DynamicTable.defaultProps = {
  config: {
    components: {},
    labels: {}
  }
};

export default DynamicTable;
