import { Contract, ethers } from 'ethers'
import { BigNumber } from 'ethers'

const erc20Abi = [
    'function allowance(address owner, address spender) external view returns (uint256)',
    'function approve(address spender, uint256 amount) external returns (bool)',
    'function balanceOf(address marketMaker) external view returns (uint256)',
    'function totalSupply() public view returns (uint256)',
    'function name() public view returns (string memory)',
    'function symbol() public view returns (string memory)'
]

export class ERC20Service {
    provider: ethers.providers.Web3Provider | ethers.providers.JsonRpcProvider
    contract: Contract

    constructor(
        provider: ethers.providers.Web3Provider | ethers.providers.JsonRpcProvider,
        contractAddress: string,
    ) {
        this.provider = provider
        this.contract = new ethers.Contract(contractAddress, erc20Abi, provider)
    }


    allowance = async (owner: string, spender: string): Promise<BigNumber> => {
        return this.contract.allowance(owner, spender)
    }

    balanceOf = async (owner: string): Promise<BigNumber> => {
        return await this.contract.balanceOf(owner)
    }

    hasMaxAllowance = async (owner: string, spender: string): Promise<boolean> => {
        const allowance: BigNumber = await this.contract.allowance(owner, spender)
        return allowance.gte(BigNumber.from('0xffffffffffffffffffffffff')) // some erc20 implementations do not cope with MaxUint256 well
    }

    name = async (): Promise<string> => {
        return await this.contract.name()
    }

    symbol = async (): Promise<string> => {
        return await this.contract.symbol()
    }

    totalSupply = async (): Promise<BigNumber> => {
        return await this.contract.totalSupply()
    }
}
