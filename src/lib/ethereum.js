
import abiCoin from './coinabi.json'
import {ethers} from 'ethers'


const provider = ethers.getDefaultProvider("kovan", {
  infura: {
      projectId: '032ee620283948639db76ca494356836',
      projectSecret: 'd11cc93628bd49279ea6f21ff56b8890'
  },
});

export const ContractCoin = {
  name: 'Coin',
  abi: abiCoin,
  contract: new ethers.Contract(
    process.env.REACT_APP_ETHEREUM_COIN_ADDRESS,
    abiCoin,
    provider
  ),
}

export default provider