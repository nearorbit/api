import { rewardsArray, RewardsData } from "../constants/rewards";

export class PoolsService {
  protected async findAllPools() {
    try {
      let list = [];
      for (let i = 0; i < rewardsArray.length; i++) {
        list.push({
          rewardId: `r${rewardsArray[i].stakingToken}`,
          tvl: 0,
          apy1d: 0,
          address: "0x3c13c28cC30E2048C6d419Bad4886f1F4a3208db",
        } as RewardsData);
      }
      return list;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
