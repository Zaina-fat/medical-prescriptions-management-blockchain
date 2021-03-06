const SHA256 = require('crypto-js/sha256')

const DIFFICULTY = 3

class CryptBlock {
    index: number
    timestamp: string
    nodeHash: string
    prevHash: string
    data: string
    nonce: number
    hash: string

    constructor(timestamp, data, nodeHash, prevHash = "", index = 0, nonce = 0, hash = "") {
        this.index = index
        this.timestamp = timestamp
        this.nodeHash = nodeHash
        this.prevHash = prevHash
        this.data = data
        this.nonce = nonce || 0
        this.hash = (hash == "") ? this.computeHash() : hash
    }

    proofOfWork() {
        while (this.hash.substring(0, DIFFICULTY) !== Array(DIFFICULTY + 1).join("0")) {
            this.nonce++
            this.hash = this.computeHash()
        }
    }
    computeHash() {
        return SHA256(this.index + this.timestamp + JSON.stringify(this.data) + this.nodeHash + this.prevHash + this.nonce).toString()
    }
}

module.exports = CryptBlock
