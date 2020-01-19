import crudHandlers from './crudHandlers';

const collectionName = "spottings";

const ISO_8601_FULL = /^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(.[0-9]+)?(Z)?$/i;
export const validateDate = (dateAndTime) => ISO_8601_FULL.test(dateAndTime);
export const validateConfidence = (confidence) => typeof confidence === "boolean";

/*
	"date_time": Date [ISO_8601_FULL format],
	"location": string,
	"bird_type": string,
	"name": string,
    "confident": boolean
 */
export const validateSpotting = (data) => {
    const validDate = ("date_time" in data) && validateDate(data.date_time);
    const validConfidence = ("confident" in data) && validateConfidence(data.confident);

    return validDate && validConfidence
        && ("location" in data) && ("bird_type" in data) && ("name" in data);
};

export default {
    get: crudHandlers.get(collectionName, true),
    post: crudHandlers.post(collectionName, validateSpotting),
    delete: crudHandlers.deleteEverything(collectionName)
};