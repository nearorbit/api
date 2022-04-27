import { Context } from "aws-lambda";
import { MessageUtil } from "../utils/message";

import { PoolsService } from "../service/pool";

export class PoolsController extends PoolsService {
  /**
   * Find a pool by id
   * @param event
   */
  /**
   * Find pools
   */
  async findPools() {
    try {
      const result = await this.findAllPools();
      return MessageUtil.success(result);
    } catch (err) {
      console.error(err);

      return MessageUtil.error(err.code, err.message);
    }
  }
}
