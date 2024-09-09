"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RentalValidations = void 0;
const zod_1 = require("zod");
const createRentalValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        bikeId: zod_1.z.string({ required_error: 'Bike ID is required' }),
        startTime: zod_1.z
            .string({ required_error: 'Start time is required' })
            .datetime({ offset: true }),
    }),
});
exports.RentalValidations = {
    createRentalValidationSchema,
};
