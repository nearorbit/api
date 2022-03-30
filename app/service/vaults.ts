import { Model } from 'mongoose';

export class VaultsService {
  private vaults: Model<any>;
  constructor(vaults: Model<any>) {
    this.vaults = vaults;
  }

  /**
  * Returns hello
  * @param id
  */
  protected helloByNothing() {
    return {
      msg: `hello`
    };
  }


  /**
 * Returns hello
 * @param id
 */
  protected findVaults() {
    return this.vaults.find()
  }
}