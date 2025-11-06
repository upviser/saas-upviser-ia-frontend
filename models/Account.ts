import mongoose, { Document, Model } from 'mongoose'

interface IAccount extends Document {
    tenantId: string
    firstName?: string
    lastName?: string
    email: string
    password: string
}

const AccountSchema = new mongoose.Schema({
    tenantId: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true, select: false }
}, {
    timestamps: true
})

const Account: Model<IAccount> = mongoose.models.Account || mongoose.model<IAccount>('Account', AccountSchema)

export default Account