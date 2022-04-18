import { Handler, Context } from "aws-lambda";

import { VaultsController } from "./controller/vaults";
const vaultsController = new VaultsController();

export const findVaults: Handler = () => vaultsController.findVaults();
export const findOneVault: Handler = (event: any, context: Context) =>
  vaultsController.findOneVault(event, context);

// export const findPools: Handler = () => vaultsController.test();
// export const findOnePool: Handler = () => vaultsController.test();

export const updateVaults: Handler = () => vaultsController.updateVaults();
// export const updatePools: Handler = () => vaultsController.test();

export const test: Handler = (event: any, context: Context) =>
  vaultsController.test(event, context);
