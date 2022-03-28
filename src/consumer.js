import {
  updatedRequest,
  newRequest
} from "./ethereum";

const consume = () => {
  updatedRequest((id, temperature) => {
    console.log("UPDATE REQUEST DATA EVENT ON SMART CONTRACT");
    console.log("UPDATE REQUEST DATA: ");
    console.log(temperature);
    console.log("\n");
  });

  newRequest((id) => {
    console.log("NEW REQUEST DATA EVENT ON SMART CONTRACT");
    console.log("NEW REQUEST DATA: ");
    console.log(id);
    console.log("\n");
  });
};

export default consume;
