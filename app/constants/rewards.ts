export interface RewardsData {
  rewardId: RewardId;
  tvl: number;
  apy1d: number;
  address: string;
}

export interface Reward {
  stakingToken: string;
  rewardToken: string;
  stakingAddress: string;
}

export type RewardId = "rbig4" | "rbig3" | "rbig2";

export const REWARDS: { [key in RewardId]: Reward } = {
  rbig4: {
    stakingToken: "big4",
    rewardToken: "orb",
    stakingAddress: "0x3c13c28cC30E2048C6d419Bad4886f1F4a3208db", // todo: change
  },
  rbig3: {
    stakingToken: "big3",
    rewardToken: "orb",
    stakingAddress: "0x3c13c28cC30E2048C6d419Bad4886f1F4a3208db", // todo: change
  },
  rbig2: {
    stakingToken: "big2",
    rewardToken: "orb",
    stakingAddress: "0x3c13c28cC30E2048C6d419Bad4886f1F4a3208db", // todo: change
  },
};

export const rewardsArray: Reward[] = Object.values(REWARDS);
export const rewardIdsArray: RewardId[] = Object.keys(REWARDS) as RewardId[];
export const getReward = (rewardId: RewardId): Reward => REWARDS[rewardId];
