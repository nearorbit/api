import {
    attribute,
    hashKey,
    rangeKey,
    table,
} from '@aws/dynamodb-data-mapper-annotations';

@table('aurora-db')
export class VaultObject {
    @hashKey()
    address: string;

    @rangeKey()
    createdAt: number;

    @attribute()
    name: string

    @attribute()
    symbol: string

    @attribute()
    totalSupply: number

    @attribute()
    nav: number

    @attribute()
    mcap: number

    @attribute()
    uid: String
}