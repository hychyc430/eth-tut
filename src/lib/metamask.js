const ethers = require('ethers');

class MetaMask {
  constructor (ethereum) {
    if (typeof ethereum === 'undefined') {
      throw new Error('No Ethereum detected')
    }
    if (!ethereum.isMetaMask) {
      console.debug('Unknown ETH.')
    }
    this.ethereum = ethereum;
  }

  async enable () {
    await this.ethereum.enable()
    this.provider = new ethers.providers.Web3Provider(this.ethereum);
    this.signer = this.provider.getSigner();
  }

  getAccount () {
    // if (!this.signer.isSigner) {
    //   throw new Error('Please enable Metamask first')
    // }
    return this.signer.getAddress
  }

  async sendTransaction (params) {
    return new Promise((resolve, reject) => {
      this.provider.sendAsync({
        method: 'eth_sendTransaction',
        params: [params],
        from: params.from,
        value: ethers.utils.parseEther("1.0"),
      }, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  }
}

export default new MetaMask(window.ethereum)
