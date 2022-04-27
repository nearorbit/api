import { AURORA_NETWORK } from "./networks";

export interface Token {
  symbol: string;
  name?: string;
  address: string;
  decimals: number;
  displayedDecimals: number;
  network?: number;
}
export type TokenId = "orb";

const tokens: { [key in TokenId]: Token } = {
  // AURORA gov token
  orb: {
    symbol: "ORB",
    name: "Orbit",
    address: "0x3c13c28cC30E2048C6d419Bad4886f1F4a3208db",
    decimals: 18,
    displayedDecimals: 4,
    network: AURORA_NETWORK,
  },
};

export const tokensArray: Token[] = Object.values(tokens);
export const tokenIdsArray: TokenId[] = Object.keys(tokens) as TokenId[];
export const getToken = (tokenId: TokenId): Token => tokens[tokenId];
export const getTokenId = (address: string): TokenId | undefined =>
  tokenIdsArray.find(
    (t) => tokens[t].address.toLowerCase() === address.toLowerCase()
  );
export const getTokenIdsArray = (network: number) => {
  let _tokensIds: TokenId[] = [];
  tokenIdsArray.map((row, index) => {
    if (tokensArray[index].network === network) {
      _tokensIds = [..._tokensIds, row];
    }
  });
  return _tokensIds;
};
