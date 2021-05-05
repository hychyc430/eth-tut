import React from 'react'

import { ContractCoin } from '../lib/ethereum'

import EthereumNetwork from './EthereumNetwork'
import MetaMask from './Metamask'
import EthereumContract from './EthereumContract'

export default function App () {
  return (
    <div className="container-fluid p-3">
      <div className="row">
        <div className="col-md-6 mb-3">
          <EthereumNetwork />
        </div>

        <div className="col-md-6 mb-3">
          <MetaMask />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <EthereumContract {...ContractCoin} />
        </div>

      </div>
    </div>
  )
}
