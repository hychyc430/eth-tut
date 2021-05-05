import React, { PureComponent } from 'react'
import logo from './logo.png'

export default class EthereumNetwork extends PureComponent {
  render() {
    return (
      <div className="card pt-3">
        <img src={logo} className="card-img-top w-75 m-auto" alt="Conflux" />
        <div className="card-body">
          <h5 className="card-title">Ethereum Frontend</h5>
          <p className="card-text">This is a demo frontend project for Ethereum.</p>
          <p className="card-text">Node URL: <code>{process.env.REACT_APP_ETHEREUM}</code></p>
        </div>
      </div>
    )
  }
}
