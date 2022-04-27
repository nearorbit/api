import { Context } from "aws-lambda";
import { MessageUtil } from "../utils/message";
import { ChartsService } from "../service/charts";

export class ChartsController extends ChartsService {
  /**
   * Find a chart by id
   * @param event
   */
  async findOneChart(event: any, context: Context) {
    console.log("memoryLimitInMB: ", context.memoryLimitInMB);
    const params: any = event.queryStringParameters;
    try {
      const result = await this.findChartById(
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

  /**
   * Update all charts
   */
  async updateCharts() {
    try {
      const result = await this.updateAllCharts();
      return MessageUtil.success(result);
    } catch (err) {
      console.error(err);

      return MessageUtil.error(err.code, err.message);
    }
  }
}
