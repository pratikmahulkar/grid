import { LightningElement, track } from "lwc";
// import { callGrid } from "c/gridhelper";
import { callGrids } from "c/gridhelper";

export default class AccountPage extends LightningElement {
  // @track criteria;
  // dataTable;

  onchange(e) {
    debugger;
    // this.criteria = e.detail.value;
    // this.dataTable = this.template.querySelector("lightning-datatable");
    // getTermOptions();
    // callGrid(this.dataTable);
  }

  renderedCallback() {
    debugger;
    console.log("renderedCallback");
    // this.dataTable = this.template.querySelector("lightning-datatable");
    // console.log(this.dataTable);
    let dts = this.template.querySelectorAll("lightning-datatable");
    console.log(dts);
    callGrids(dts);
    // this.configureAttributes();
  }

  handleOnSelected() {
    //event console.log(JSON.stringify(event));
  }
}
