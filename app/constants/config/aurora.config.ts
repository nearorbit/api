import { ethers } from 'ethers'

export const AURORA_NETWORK = 1313161554
export const networks: { [key: number]: string } = {
    [AURORA_NETWORK]: 'aurora',
}

export const AURORA_RPC = 'https://mainnet.aurora.dev'

export const AURORA_PROVIDER = new ethers.providers.JsonRpcProvider(AURORA_RPC)