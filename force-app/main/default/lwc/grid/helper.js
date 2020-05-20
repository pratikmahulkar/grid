const callGrid = () => {
  this.handleOnClick();
  console.log("callGrid");
  this.dataTable = this.template.querySelector("lightning-datatable");
  console.log(this.dataTable);
  this.configureAttributes();
};
configureAttributes = () => {
  console.log("configureAttributes");
  if (this.dataTable && this.record) {
    for (let attr in this.record) {
      if (this.record[attr] && this.record.hasOwnProperty(attr)) {
        if (attr === "data") {
          this.record[attr].forEach((val) => {
            this.transformObject(val);
          });
          this.dataTable[attr] = this.record[attr];
        } else {
          this.dataTable[attr] = this.record[attr];
        }
      }
    }
  }
};

transformObject = (sObj) => {
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

handleOnClick = () => {
  getGridConfig({
    gridConfigName: this.gridConfigName,
    criteriaParams: this.criteriaParams ? JSON.parse(this.criteriaParams) : null
  })
    .then((res) => {
      this.record = res;
      this.error = undefined;
      this.configureAttributes();
    })
    .catch((e) => {
      this.record = undefined;
      this.error = e;
    });
};
export { callGrid};