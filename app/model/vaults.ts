import mongoose from 'mongoose';

export type VaultsDocument = mongoose.Document & {
    address: string,
    name: string,
    symbol: string,
    totalSupply: number,
    nav: number,
    mcap: number,
    lastUpdated: Date,
};


export const dynamicsVaultsSchema = (collection: string) => {
    return new mongoose.Schema({
        address: String,
        name: String,
        symbol: String,
        totalSupply: Number,
        nav: Number,
        mcap: Number,
        lastUpdated: { type: Date, default: Date.now },
    }, { collection, strict: false })
}

// Note: OverwriteModelError: Cannot overwrite `Books` model once compiled. error

export const dynamicModel = (collection: string) => {
    const vaults = (mongoose.models.collection ||
        mongoose.model<VaultsDocument>(collection, dynamicsVaultsSchema(collection))
    );
    return vaults
}
export const createCollection = (collectionName: string, model: any) => {
    return mongoose.model(collectionName, model);
}

export const baseModel = (mongoose.models.general ||
    mongoose.model<VaultsDocument>('general', dynamicsVaultsSchema('general'))
);


export const Schema = mongoose.Schema

