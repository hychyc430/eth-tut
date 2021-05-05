import React, { PureComponent } from 'react'

import provider from '../lib/ethereum'
import metaMask from '../lib/metamask'
const ethers = require('ethers')
const PORTAL_STATE_DISCONNECTED = 0
const PORTAL_STATE_CONNECTING = 1
const PORTAL_STATE_CONNECTED = 2

export default class MetaMask extends PureComponent {
  state = {
    status: PORTAL_STATE_DISCONNECTED,
    connecting: false,
    account: '',
    balance: '',
  }

  connectMetaMask = async () => {
    this.setState({ status: PORTAL_STATE_CONNECTING })
    await metaMask.enable()
    const account = metaMask.getAccount()
    this.setState({ status: PORTAL_STATE_CONNECTED, account, balance: '' })
    this.refreshBalance()
  }

  refreshBalance = async () => {
    if (!this.state.account) {
      return
    }
    this.setState({ balance: '' })
    const balance = await provider.getBalance(this.state.account)
    this.setState({ balance: ethers.utils.formatEther(balance) })
  }

  renderPortalButton = () => {
    if (this.state.status === PORTAL_STATE_CONNECTED) {
      return (
        <button className="btn btn-success">
          Connected to MetaMask
        </button>
      )
    } else if (this.state.status === PORTAL_STATE_CONNECTING) {
      return (
        <button className="btn btn-primary">
          Connecting...
        </button>
      )
    } else {
      return (
        <button className="btn btn-primary" onClick={this.connectMetaMask}>
          Connect to MetaMask
        </button>
      )
    }
  }

  renderConnectedAccount = () => {
    if (this.state.status === PORTAL_STATE_CONNECTED) {
      return (
        <div className="mt-3">
          <div>Account: <code>{this.state.account}</code></div>
          <div className="d-flex align-items-center">
            <div className="mr-1">Balance: {this.state.balance ? `${this.state.balance} ETH` : 'Loading...'}</div>
            <span
              className="badge badge-primary"
              style={{ cursor: 'pointer' }}
              onClick={this.refreshBalance}
            >refresh</span>
          </div>
        </div>
      )
    }
    return null
  }

  render () {
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">MetaMask</h5>
          {this.renderPortalButton()}
          {this.renderConnectedAccount()}
        </div>
      </div>
    )
  }
}
