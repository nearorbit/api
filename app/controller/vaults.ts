import { Context } from 'aws-lambda';
import { Model } from 'mongoose';
import { MessageUtil } from '../utils/message';
import { VaultsService } from '../service/vaults';

export class VaultsController extends VaultsService {
  constructor(vaults: Model<any>) {
    super(vaults);
  }

  /**
   * hello
   * @param {*} event
   */
  async hello() {
    // const id: number = event.pathParameters.id;
    try {
      const result = await this.helloByNothing();
      return MessageUtil.success(result);
    } catch (err) {
      console.error(err);

      return MessageUtil.error(err.code, err.message);
    }
  }

  /**
  * Get all vaults
  */
  async find() {
    try {
      const result = await this.findVaults();
      return MessageUtil.success(result);
    } catch (err) {
      console.error(err);

      return MessageUtil.error(err.code, err.message);
    }
  }

  /**
    * Query vault by id
    * @param event
    * 
    * 
    * 
    * name = index.name
    * mcap = nav * totalSupply
    * nav = periphery.nav(index.address)
    * apr = navToday - navYesterday / navYesterday
    * tokens = index.getComponents
    */

  /**
    * Update all vaults
    * 
    * controller.getVaults
    * if current collections = getVaults, jump
    * else, create collection for new vault if missing
    * assert getVaults and current collections match
    * for each vault:
    * get name
    * get symbol
    * get components
    * get totalSupply
    * get nav (from periphery)
    * get mcap
    * get 1d apr
    * get 7d apr
    * get 1m apr
    * get 3m apr
    * get 6m apr
    * get 9m apr
    * get 12m apr
    * @note create helper fn to find nearest timestamp to T - targetTime (unix)
    * @note create logic for 0 if n/a
    * create new record with VaultInfo type
    * 
    * assert new records len == getVaults
    * else, report
    */
}




/**
  * DB Architecture
  * 
  * vaults
  * - 0x1
  * - 0x2
  * - 0x3
  * 
  * reports
  * - status for each period
  */
