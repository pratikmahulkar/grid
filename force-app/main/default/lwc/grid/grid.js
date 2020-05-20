/* eslint-disable no-debugger */
/* eslint-disable no-console */
import { LightningElement, track, api } from "lwc";
import getGridConfig from "@salesforce/apex/GridController.getGridConfig";
import  getGridConfigs from "@salesforce/apex/GridController.getGridConfigs";

export default class Grid extends LightningElement {
  @track record;
  @track error;
  dataTable = undefined;
  @api gridConfigName;
  @api criteriaParams;

  connectedCallback() {
    console.log("connectedCallback");
    this.handleOnClick();
debugger;
    getGridConfigs({
      gridConfigNames: [this.gridConfigName]
    })
      .then(res => {
        console.log(res);
        //this.record = res;
        //this.error = undefined;
        //this.configureAttributes();
      })
      .catch(e => {
        console.log(e);
        //this.record = undefined;
        //this.error = e;
      });

    // this.configureAttributes();
  }
  renderedCallback() {
    console.log("renderedCallback");
    this.dataTable = this.template.querySelector("lightning-datatable");
    console.log(this.dataTable);
    this.configureAttributes();
  }
  callGrid(){
    this.handleOnClick();
    console.log("callGrid");
    this.dataTable = this.template.querySelector("lightning-datatable");
    console.log(this.dataTable);
    this.configureAttributes();

  }
  configureAttributes() {
    console.log("configureAttributes");
    if (this.dataTable && this.record) {
      for (let attr in this.record) {
        if (this.record[attr] && this.record.hasOwnProperty(attr)) {
          if (attr === "data") {
            this.record[attr].forEach(val => {
              this.transformObject(val);
            });
            this.dataTable[attr] = this.record[attr];
          } else {
            this.dataTable[attr] = this.record[attr];
          }
        }
      }
    }
  }

  transformObject(sObj) {
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
  }

  handleOnClick() {
    getGridConfig({
      gridConfigName: this.gridConfigName,
      criteriaParams: this.criteriaParams
        ? JSON.parse(this.criteriaParams)
        : null
    })
      .then(res => {
        this.record = res;
        this.error = undefined;
        this.configureAttributes();
      })
      .catch(e => {
        this.record = undefined;
        this.error = e;
      });
  }
  get columns() {
    if (this.record) return this.record.columns;
    return [];
  }
  handleRowSelection(event) {
    console.log("handleRowSelection" + JSON.stringify(event));

    // Creates the event with the contact ID data.
    const selectedEvent = new CustomEvent("selected", {
      detail: { type: "handleRowSelection", target: event.target }
    });

    // Dispatches the event.
    this.dispatchEvent(selectedEvent);
  }

  handleHeaderAction(event) {
    console.log("handleHeaderAction" + JSON.stringify(event));
    // Creates the event with the contact ID data.
    const selectedEvent = new CustomEvent("selected", {
      detail: { type: "handleHeaderAction", target: event.target }
    });

    // Dispatches the event.
    this.dispatchEvent(selectedEvent);
  }

  handleLoadMore(event) {
    console.log("handleLoadMore" + JSON.stringify(event));
    // Creates the event with the contact ID data.
    const selectedEvent = new CustomEvent("selected", {
      detail: { type: "handleLoadMore", target: event.target }
    });

    // Dispatches the event.
    this.dispatchEvent(selectedEvent);
  }

  handleResize(event) {
    console.log("handleResize" + JSON.stringify(event));
    // Creates the event with the contact ID data.
    const selectedEvent = new CustomEvent("selected", {
      detail: { type: "handleResize", target: event.target }
    });

    // Dispatches the event.
    this.dispatchEvent(selectedEvent);
  }

  handleSave(event) {
    console.log("handleSave" + JSON.stringify(event));
    // Creates the event with the contact ID data.
    const selectedEvent = new CustomEvent("selected", {
      detail: { type: "handleSave", target: event.target }
    });

    // Dispatches the event.
    this.dispatchEvent(selectedEvent);
  }

  handleSort(event) {
    console.log("handleSort" + JSON.stringify(event));
    // Creates the event with the contact ID data.
    const selectedEvent = new CustomEvent("selected", {
      detail: { type: "handleSort", target: event.target }
    });

    // Dispatches the event.
    this.dispatchEvent(selectedEvent);
  }
}