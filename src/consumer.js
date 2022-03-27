import {
  updatedRequest,
  newRequest
} from "./ethereum";

const consume = () => {
  updatedRequest((event) => {
    console.log("UPDATE REQUEST DATA EVENT ON SMART CONTRACT");
    console.log("UPDATE REQUEST DATA: ");
    console.log(event.args);
    console.log("\n");
  });

  newRequest((event) => {
    console.log("NEW REQUEST DATA EVENT ON SMART CONTRACT");
    console.log("NEW REQUEST DATA: ");
    console.log(event.args);
    console.log("\n");
  });
};

export default consume;
