require("dotenv").config();

import {
  createRequest
} from "./ethereum";

const start = async () => {

  await createRequest()
};

export default start;
