// import { BigNumber as BN } from 'bignumber.js'
// import { ethers } from 'ethers';
// constants
import { AURORA_PROVIDER } from '../constants/config/aurora.config'
import { NAV_CALCULATOR, CONTROLLER } from '../constants/contracts';
import { WHITELIST } from "../constants/whitelist"

//utils
import { intersection, cFormatter } from '../utils/array';
import { uid, getDataMapper, VaultObject } from '../model'

// services
import { ERC20Service } from './erc20'
import { NavService } from './nav';
import { ControllerService } from './controller';

// hooks
const navService = new NavService(AURORA_PROVIDER, NAV_CALCULATOR)
const controllerService = new ControllerService(AURORA_PROVIDER, CONTROLLER)
const date = new Date();

export class VaultsService {

  protected async findVaultById(id: string) {
    const mapper = getDataMapper();
    try {
      for await (const item of mapper.query(VaultObject,
        { address: id },
        { limit: 1, scanIndexForward: false },
      )) {
        return item
      }

    } catch (err) {
      console.error(err);
    }
  }

  protected async findAllVaults() {
    const mapper = getDataMapper();
    try {
      for await (const item of mapper.query(VaultObject,
        { address: WHITELIST[0] },
        { limit: 1, scanIndexForward: false },
      )) {
        return item
      }

    } catch (err) {
      console.error(err);
    }
  }


  protected async updateAllVaults() {
    const sets = await controllerService.getSets()
    const tokens = intersection(sets.map(x => x.toLowerCase()), WHITELIST.map(x => x.toLowerCase()))
    const mapper = getDataMapper();
    try {
      await Promise.all(tokens.map(async (set: string) => {
        const erc20Service = new ERC20Service(AURORA_PROVIDER, set)
        const name = await erc20Service.name()
        const symbol = await erc20Service.symbol()
        const components = await erc20Service.getComponents()
        const rawTotalSupply = await erc20Service.totalSupply()
        const rawNav = await navService.getNav(set)
        const rawMcap = rawTotalSupply.mul(rawNav)
        const totalSupply = Number(rawTotalSupply)
        const nav = Number(rawNav)
        const mcap = Number(rawMcap)
        const newVault = {
          address: cFormatter(set),
          createdAt: date.getTime(),
          name,
          symbol,
          components,
          totalSupply,
          nav,
          mcap,
          uid
        }
        await mapper.put(Object.assign(new VaultObject, newVault))
      }))
      return { status: true }
    } catch (err) {
      console.error(err)
    }

  }
}
