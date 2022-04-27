import { Handler, Context } from "aws-lambda";

import { VaultsController } from "./controller/vaults";
import { PoolsController } from "./controller/pools";
import { ChartsController } from "./controller/charts";

const vaultsController = new VaultsController();
const poolsController = new PoolsController();
const chartsController = new ChartsController();

export const findVaults: Handler = () => vaultsController.findVaults();
export const findOneVault: Handler = (event: any, context: Context) =>
  vaultsController.findOneVault(event, context);

export const findOneChart: Handler = (event: any, context: Context) =>
  chartsController.findOneChart(event, context);

export const findPools: Handler = () => poolsController.findPools();

export const updateVaults: Handler = () => vaultsController.updateVaults();
export const updateCharts: Handler = () => chartsController.updateCharts();
