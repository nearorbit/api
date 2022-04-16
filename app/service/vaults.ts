import { Model } from 'mongoose';
import { createCollection, dynamicsVaultsSchema } from '../model'
import mongoose from 'mongoose';


// constants
import { AURORA_PROVIDER } from '../constants/config/aurora.config'
import { NAV_CALCULATOR, CONTROLLER } from '../constants/contracts';
import { WHITELIST } from "../constants/whitelist"

//utils
import { difference, intersection, cFormatter } from '../utils/array';

// services
import { ERC20Service } from './erc20'
import { NavService } from './nav';
import { ControllerService } from './controller';
import { dynamicModel, Schema } from '../model';

// hooks
const navService = new NavService(AURORA_PROVIDER, NAV_CALCULATOR)
const controllerService = new ControllerService(AURORA_PROVIDER, CONTROLLER)

export class VaultsService {
  private vaults: Model<any>;
  constructor(vaults: Model<any>) {
    this.vaults = vaults;
  }

  protected async updateAllVaults() {
    let db = this.vaults
    let sets = await controllerService.getSets()
    let col = await Object.keys(db.db.collections)
    let diff = intersection(difference(sets.map(x => x.toLowerCase()), col.map(x => x.toLowerCase())), WHITELIST.map(x => x.toLowerCase()))
    if (diff.length > 0) {
      for (let i in diff) {
        // todo: abstract to a helper function
        const NewCollection = createCollection(cFormatter(diff[i]), dynamicsVaultsSchema(diff[i]));
        const newCollection = new NewCollection({
          address: "0x0",
          name: "SATOSHI",
          symbol: "NAKAMOTO",
          totalSupply: 1,
          nav: 1,
          mcap: 1,
          lastUpdated: new Date,
        });
        try {
          await newCollection.save()
        } catch (err) {
          console.error(err)
        }
      }
    }
    sets = await controllerService.getSets()
    col = await Object.keys(db.db.collections)
    const inter = intersection(intersection(sets.map(x => x.toLowerCase()), col.map(x => x.toLowerCase())), WHITELIST.map(x => x.toLowerCase()))



    const results = await Promise.all(inter.map(async (set: string) => {
      const erc20Service = new ERC20Service(AURORA_PROVIDER, set)

      const name = await erc20Service.name()
      const symbol = await erc20Service.symbol()
      const totalSupply = await erc20Service.totalSupply()
      const nav = await navService.getNav(set)
      const mcap = totalSupply.mul(nav)

      return { name, symbol, totalSupply, nav, mcap }
    }));




    try {
      return { inter, sets, col, results }
    } catch (err) {
      console.error(err)
    }
  }
}