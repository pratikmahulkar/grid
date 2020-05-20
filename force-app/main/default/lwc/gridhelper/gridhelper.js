/* eslint-disable no-debugger */
/* eslint-disable no-console */
import { LightningElement, track, api } from "lwc";
import getGridConfig from "@salesforce/apex/GridController.getGridConfig";
// import getGridConfigs from "@salesforce/apex/GridController.getGridConfigs";

// let record;
// let e;
// let dataTable = undefined;
// let gridConfigName;
// let criteriaParams;

const callGrid = (dt) => {
  debugger;
  // dataTable = dt;
  console.log(dt);
  if (dt) {
    const gridConfigName = dt.className;
    retrieveGridConfig(gridConfigName, dt);
    // console.log("callGrid");
    // updateDataTableProperties();
  }
};
const updateDataTableProperties = (dataTable, record) => {
  debugger;
  console.log("updateDataTableProperties");
  if (dataTable && record) {
    for (let attr in record) {
      if (record[attr] && record.hasOwnProperty(attr)) {
        if (attr === "data") {
          record[attr].forEach((val) => {
            transformObject(val);
          });
          dataTable[attr] = record[attr];
        } else {
          dataTable[attr] = record[attr];
        }
      }
    }
  }
};

const transformObject = (sObj) => {
  debugger;
  if (sObj) {
    for (let field in sObj) {
      if (sObj.hasOwnProperty(field)) {
        switch (typeof sObj[field]) {
          case "object":
            for (let relField in sObj[field]) {
              if (sObj[field][relField])
                sObj[field + "." + relField] = sObj[field][relField];
            }
            break;
          default:
            break;
        }
      }
    }
  }
};

const retrieveGridConfig = (gridConfigName, dt) => {
  debugger;
  getGridConfig({
    gridConfigName: gridConfigName,
    criteriaParams: null
  })
    .then((res) => {
      updateDataTableProperties(dt, res);
    })
    .catch((ex) => {
      console.error(ex);
    });
};
const callGrids = (dts) => {
  debugger;
  dts.forEach(function (dt) {
    debugger;
    callGrid(dt);
  });
};
export { callGrid, callGrids };
