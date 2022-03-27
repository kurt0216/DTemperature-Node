require("dotenv").config();

import Web3 from "web3";
const contract = require('@truffle/contract')

const OracleContract = require('./abi/Temperature.json')

const web3 = new Web3(process.env.WEB3_PROVIDER_ADDRESS)

// deployed contract
const oracleContract = contract({ abi: OracleContract.abi, address: process.env.CONTRACT_ADDRESS})
oracleContract.setProvider(web3.currentProvider)

if (typeof oracleContract.currentProvider.sendAsync !== "function") {
  oracleContract.currentProvider.sendAsync = function() {
    return oracleContract.currentProvider.send.apply(
        oracleContract.currentProvider, arguments
    );
  };
}

export const createRequest = () => {
  return new Promise(async (resolve, reject) => {

    const accounts = await web3.eth.getAccounts()
    const oracleInstance = await oracleContract.deployed()

    // call createRequest method of contract
    await oracleInstance.createRequest({from: accounts[0]})
  });
};

export const updateRequest = ({
  roundId,
  valueRetrieved
}) => {
  return new Promise(async(resolve, reject) => {

    const accounts = await web3.eth.getAccounts()
    const oracleInstance = await oracleContract.deployed()

    // call updateRequest method of contract
    await oracleInstance.updateRequest(roundId, valueRetrieved, {from: accounts[0]})
  });
};

export const newRequest = async (callback) => {
  const oracleInstance = await oracleContract.deployed()

  // Event from contract
  oracleInstance.NewRequest()
      .on('data', async (event) => callback(event))
};

export const updatedRequest = async (callback) => {

  const oracleInstance = await oracleContract.deployed()

  // Event from contract
  oracleInstance.UpdatedRequest()
      .on('data', async (event) => callback(event))
};
