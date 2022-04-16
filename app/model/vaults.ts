import AWS from 'aws-sdk';
import { DataMapper } from '@aws/dynamodb-data-mapper';
import { String } from 'aws-sdk/clients/acm';
import { v4 as uuid } from 'uuid'

AWS.config.update({ region: "us-east-1" })

export const dynamodb = new AWS.DynamoDB.DocumentClient()

export function getDataMapper(): DataMapper {
    let client: AWS.DynamoDB;
    // if (offline) {
    //     client = new AWS.DynamoDB({
    //         region: 'localhost',
    //         endpoint: 'http://localhost:8000',
    //         accessKeyId: '',
    //         secretAccessKey: '',
    //     });
    // } else {
    client = new AWS.DynamoDB();
    // }
    return new DataMapper({ client });
}

export interface VaultItem {
    address: string
    name: string
    symbol: string
    totalSupply: number
    nav: number
    mcap: number
    lastUpdated: number
    uid: String
}

export const uid = uuid()

// 2. query

// let queryParams = {
//     TableName: "aurora-db",
//     Key: {
//         PK: `ORG#364ace2c-2c73-4440-8887-d1c95a3192e7`,
//         SK: `#META#364ace2c-2c73-4440-8887-d1c95a3192e7`,
//     }
// }

export const get = async (queryParams: any) => {
    return await dynamodb.get(queryParams).promise()
}

export const put = async (putParams: any) => {
    return await dynamodb.put(putParams).promise()
}

