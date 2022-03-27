import {
  updateRequest,
  newRequest
} from "./ethereum";

const oracle = () => {

  newRequest((event) => {

    // Use test temperature instead of calling the API from thirdparty
    // NOte that temperature should be converted uint value with 2 decimals
    const temp = convertTemperature(10);
    updateRequest({roundId: event.args.id, valueRetrieved: temp})
  });
};

// ex:]
// 27200 => -10`C
// 27300 => 0`C
// 27400 => 10`C
const convertTemperature = (temperature) => {
  return (temperature + 273) * 100;
}

export default oracle;
