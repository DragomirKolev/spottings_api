import { 
    validateConfidence, 
    validateSpotting,
    validateDate,
} from '../../handlers/spottingsHandlers';

describe('spottingsHandlers', () => {
    describe('validateConfidence' , () => {
        it('should return true if value passed is boolean', () => {
            const validatedValue = validateConfidence(true);
            expect(validatedValue).toEqual(true);
        });

        it('should return false if value passed is not a boolean', () => {
            const validatedValue = validateConfidence({});
            expect(validatedValue).toEqual(false);
        });
    });

    describe('validateSpotting' , () => {
        it('should return true if data provided is sufficient', () => {
            const data = {
                date_time: new Date().toISOString(),
                location: 'in the middle of nowhere',
                bird_type: 'birdy',
                name: 'George Paul',
                confident: true
            };
            const validData = validateSpotting(data);
            expect(validData).toEqual(true);
        });

        it('should return false if data provided is not sufficient', () => {
            const data = {
                date_time: new Date().toISOString(),
                location: 'in the middle of nowhere',
                name: 'George Paul',
                confident: true
            };
            const validData = validateSpotting(data);
            expect(validData).toEqual(false);
        });
    });

    describe('validateDate' , () => {
        it('should return true if value passed is a valid Date format', () => {
            const newJavascriptDate = new Date();
            const validatedDate = validateDate(newJavascriptDate.toISOString());
            expect(validatedDate).toEqual(true);
        });

        it('should return false if value passed is not a valid Date format', () => {
            expect(validateDate('NOT A DATE')).toEqual(false);
        });
    });
});