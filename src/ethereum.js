require("dotenv").config();

import { ethers } from "ethers";
const OracleContract = require('./abi/Temperature.json')

const provider = ethers.providers.getDefaultProvider('rinkeby')

const wallet = new ethers.Wallet(process.env.ACCOUNT_PRIVATE_KEY, provider)

const oracleInstance = new ethers.Contract(process.env.CONTRACT_ADDRESS, OracleContract.abi, wallet)


export const createRequest = () => {
  return new Promise(async (resolve, reject) => {

    // call createRequest method of contract
    await oracleInstance.createRequest()
  });
};

export const updateRequest = ({
  roundId,
  valueRetrieved
}) => {
  return new Promise(async(resolve, reject) => {

    // call updateRequest method of contract
    await oracleInstance.updateRequest(roundId, valueRetrieved)
  });
};

export const newRequest = async (callback) => {

  // Event from contract

  oracleInstance.on("NewRequest", (id) => {
    callback(id)
  })
};

export const updatedRequest = async (callback) => {

  // Event from contract

  oracleInstance.on("UpdatedRequest", (id, temperature) => {
    callback(id, temperature)
  })
};
