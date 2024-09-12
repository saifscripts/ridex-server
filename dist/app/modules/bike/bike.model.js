"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bike = void 0;
const mongoose_1 = require("mongoose");
const BikeSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    pricePerHour: { type: String, required: true },
    isAvailable: { type: Boolean, default: true },
    cc: { type: String, required: true },
    year: { type: String, required: true },
    model: { type: String, required: true },
    brand: { type: String, required: true },
}, {
    timestamps: true,
});
exports.Bike = (0, mongoose_1.model)('Bike', BikeSchema);
