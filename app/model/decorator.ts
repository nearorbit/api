import {
  attribute,
  hashKey,
  rangeKey,
  table,
} from "@aws/dynamodb-data-mapper-annotations";

@table(`${process.env.STAGE}-vaults`)
export class VaultObject {
  @hashKey()
  address: string;

  @attribute({ defaultProvider: () => Date.now() })
  createdAt: number;

  @attribute()
  name: string;

  @attribute()
  symbol: string;

  @attribute()
  components: string[];

  @attribute()
  totalSupply: number;

  @attribute()
  nav: number;

  @attribute()
  mcap: number;

  @attribute()
  apr: number;

  @attribute()
  uid: String;
}

@table(`${process.env.STAGE}-charts`)
export class ChartObject {
  @hashKey()
  address: string;

  @rangeKey({ defaultProvider: () => Date.now() })
  createdAt: number;

  @attribute()
  totalSupply: number;

  @attribute()
  nav: number;

  @attribute()
  mcap: number;

  @attribute()
  uid: String;
}
