export interface MockStakingPoolInterface {
    address: string
    underlyingToken: string
    apr: number
    balance: number
    yieldProjection: {
        oneDay: number
        threeDay: number
        sevenDay: number
    }
}

export const MockStakingPool: MockStakingPoolInterface = {
    address: "0x10000000000000000000000000000",
    underlyingToken: "0x20000000000000000000000000000",
    apr: .33,
    balance: 100,
    yieldProjection: {
        oneDay: .33,
        threeDay: .42,
        sevenDay: .38,
    }
}