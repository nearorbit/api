import mongoose from 'mongoose';

export type VaultsDocument = mongoose.Document & {
    name: string,
    id: number,
    createdAt: Date,
};

const vaultsSchema = new mongoose.Schema({
    name: String,
    id: { type: Number, index: true, unique: true },
    createdAt: { type: Date, default: Date.now },
});

// Note: OverwriteModelError: Cannot overwrite `Books` model once compiled. error
export const vaults = (mongoose.models.vaults ||
    mongoose.model<VaultsDocument>('vaults', vaultsSchema, process.env.DB_BOOKS_COLLECTION)
);