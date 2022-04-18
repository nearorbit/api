import { Context } from "aws-lambda";
import { MessageUtil } from "../utils/message";
import { VaultsService } from "../service/vaults";

export class VaultsController extends VaultsService {
  /**
   * Find a vault by id
   * @param event
   */
  async findOneVault(event: any, context: Context) {
    // The amount of memory allocated for the function
    console.log("memoryLimitInMB: ", context.memoryLimitInMB);
    console.log(process.env.DYNAMODB_TABLE);
    const id: string = String(event.pathParameters.id);
    try {
      const result = await this.findVaultById(id);
      return MessageUtil.success(result);
    } catch (err) {
      console.error(err);

      return MessageUtil.error(err.code, err.message);
    }
  }

  /**
   * Find vaults
   */
  async findVaults() {
    try {
      const result = await this.findAllVaults();
      return MessageUtil.success(result);
    } catch (err) {
      console.error(err);

      return MessageUtil.error(err.code, err.message);
    }
  }

  /**
   * Update all vaults
   */
  async updateVaults() {
    try {
      const result = await this.updateAllVaults();
      return MessageUtil.success(result);
    } catch (err) {
      console.error(err);

      return MessageUtil.error(err.code, err.message);
    }
  }

  /**
   * Test
   */
  async test(event: any, context: Context) {
    console.log("memoryLimitInMB: ", context.memoryLimitInMB);
    const params: any = event.queryStringParameters;

    try {
      const result = await this.testOnce(
        params.address,
        params.start,
        params.end
      );
      return MessageUtil.success(result);
    } catch (err) {
      console.error(err);

      return MessageUtil.error(err.code, err.message);
    }
  }
}
