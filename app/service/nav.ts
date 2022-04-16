import { Contract, ethers } from 'ethers'
import { BigNumber } from 'ethers'

import { navAbi } from '../constants/abis'

export class NavService {
    provider: ethers.providers.JsonRpcProvider
    contract: Contract

    constructor(
        provider: ethers.providers.JsonRpcProvider,
        contractAddress: string,
    ) {
        this.provider = provider
        this.contract = new ethers.Contract(contractAddress, navAbi, provider)
    }

    getNav = async (setToken: string): Promise<BigNumber> => {
        return await this.contract.getEstimatedNav(setToken)
    }
}
