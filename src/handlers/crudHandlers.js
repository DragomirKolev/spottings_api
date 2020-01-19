import dbHandler from '../db/dbHandler';
import { ObjectId } from 'mongodb';
import { ERROR_TYPES } from '../helpers/errors';

export const get = (collectionName, orderDesc = false) => (id) => {
    return dbHandler.getCollection(collectionName).then((collection) => {
        if (id == undefined) {
            return collection.find().toArray()
                .then((array) => orderDesc ? array.reverse() : array);
        }
        return collection.findOne(ObjectId(id));
    })
};

const post = (collectionName, validateFunction) => (data) => {
    return dbHandler.getCollection(collectionName).then((collection) => {
    const validData = validateFunction(data);
    if (!validData) throw {type: ERROR_TYPES.VALIDATION};
    return collection.insertOne(data)
        .then(() => collection.findOne(data));
    })
};

const deleteEverything = (collectionName) => () => {
    return dbHandler.getCollection(collectionName).then((collection) => {
        return collection.deleteMany().then((object) => object.deletedCount);
    })
};

export default {
    get,
    post,
    deleteEverything
};
