import { Contract, ethers } from 'ethers'
import { BigNumber } from 'ethers'
import { controllerAbi } from '../constants/abis'

export class ControllerService {
    provider: ethers.providers.JsonRpcProvider
    contract: Contract

    constructor(
        provider: ethers.providers.JsonRpcProvider,
        contractAddress: string,
    ) {
        this.provider = provider
        this.contract = new ethers.Contract(contractAddress, controllerAbi, provider)
    }

    getSets = async (): Promise<any> => {
        return await this.contract.getSets()
    }
}
