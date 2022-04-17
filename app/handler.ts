
import { Handler, Context } from 'aws-lambda';
import dotenv from 'dotenv';
import path from 'path';
// const dotenvPath = path.join(__dirname, '../', `config/.env.${process.env.NODE_ENV}`);
// dotenv.config({
//   path: dotenvPath,
// });
import { VaultsController } from './controller/vaults';
const vaultsController = new VaultsController()



export const findVaults: Handler = () => vaultsController.findVaults();
export const findOneVault: Handler = (event: any, context: Context) => vaultsController.findOneVault(event, context);

// export const findPools: Handler = () => vaultsController.test();
// export const findOnePool: Handler = () => vaultsController.test();

export const updateVaults: Handler = () => vaultsController.updateVaults();
// export const updatePools: Handler = () => vaultsController.test();