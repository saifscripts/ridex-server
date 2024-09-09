import mongoose, { Schema } from 'mongoose';
import { PAYMENT_STATUS, PaymentStatus } from './rental.constant';
import { IRental } from './rental.interface';

const RentalSchema: Schema = new Schema<IRental>(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        bikeId: { type: Schema.Types.ObjectId, ref: 'Bike', required: true },
        txnId: { type: String, required: true, unique: true },
        startTime: { type: Date, required: true },
        returnTime: { type: Date, default: null },
        totalCost: { type: Number, default: 0 },
        isReturned: { type: Boolean, default: false },
        isConfirmed: { type: Boolean, default: false },
        paymentStatus: {
            type: String,
            enum: PaymentStatus,
            default: PAYMENT_STATUS.UNPAID,
        },
    },
    {
        timestamps: true,
    },
);

export const Rental = mongoose.model<IRental>('Rental', RentalSchema);
