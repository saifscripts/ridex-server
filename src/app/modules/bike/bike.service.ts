import httpStatus from 'http-status';
import QueryBuilder from '../../builders/QueryBuilder';
import AppError from '../../errors/AppError';
import { BikeSearchableFields } from './bike.constant';
import { IBike } from './bike.interface';
import { Bike } from './bike.model';

const createBikeIntoDB = async (payload: IBike) => {
    const newBike = await Bike.create(payload);

    return {
        statusCode: httpStatus.CREATED,
        message: 'Bike added successfully',
        data: newBike,
    };
};

const getBikesFromDB = async (query: Record<string, unknown>) => {
    const bikeQuery = new QueryBuilder(Bike.find(), query)
        .search(BikeSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();

    // console.log(bikeQuery);
    const bikes = await bikeQuery.modelQuery;
    const meta = await bikeQuery.countTotal();

    // check if retrieved data is empty
    if (!bikes.length) {
        return {
            statusCode: httpStatus.NOT_FOUND,
            message: 'No Data Found',
            data: [],
        };
    }

    return {
        statusCode: httpStatus.OK,
        message: 'Bikes retrieved successfully',
        data: bikes,
        meta,
    };
};

const getSingleBikeFromDB = async (id: string) => {
    const bike = await Bike.findById(id);

    // check if the bike exist
    if (!bike) {
        throw new AppError(httpStatus.NOT_FOUND, 'Bike not found!');
    }

    return {
        statusCode: httpStatus.OK,
        message: 'Bike fetched successfully',
        data: bike,
    };
};

const updateBikeIntoDB = async (id: string, payload: Partial<IBike>) => {
    const isBikeExists = await Bike.findById(id);

    // check if the bike exist
    if (!isBikeExists) {
        throw new AppError(httpStatus.NOT_FOUND, 'Bike not found!');
    }

    // check if the bike exists
    const updatedBike = await Bike.findByIdAndUpdate(id, payload, {
        new: true,
    });

    return {
        statusCode: httpStatus.OK,
        message: 'Bike updated successfully',
        data: updatedBike,
    };
};

const deleteBikeFromDB = async (id: string) => {
    const isBikeExists = await Bike.findById(id);

    // check if the bike exists
    if (!isBikeExists) {
        throw new AppError(httpStatus.NOT_FOUND, 'Bike not found!');
    }

    // delete the bike
    const deletedBike = await Bike.findByIdAndDelete(id);

    return {
        statusCode: httpStatus.OK,
        message: 'Bike deleted successfully',
        data: deletedBike,
    };
};

export const BikeServices = {
    createBikeIntoDB,
    getBikesFromDB,
    getSingleBikeFromDB,
    updateBikeIntoDB,
    deleteBikeFromDB,
};
