import { 
    resolvePromiseWithResponse,
} from '../../handlers/expressHandlers';

describe('expressHandlers', () => {
    describe('resolvePromiseWithResponse' , () => {  
        it('should resolve promise with data given', () => {
            return expect(resolvePromiseWithResponse(200, true, 'YAY'))
                .resolves.toEqual({code: 200, response: "YAY", success: true});
        });
    });
});