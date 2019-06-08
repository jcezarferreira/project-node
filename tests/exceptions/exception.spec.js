const exception = require('../../src/exceptions/exception');
const mock = require('../mocks/mock-exceptions');

describe('Exception', () => {
    describe('Get Know Error - Should return an instance of an expected error', () => {
        it('should return an instance of error', () => {
            const exceptionsNames = mock.ExceptionsNames(exception);

            exceptionsNames.forEach(exceptionName => {
                const error = exception.getKnownError(exceptionName);
                const currentException = exception[exceptionName.name];
                const errorExpected = new currentException();
                expect(errorExpected).toEqual(error);
            })
        })

        it('should return "InternalServerError" if the error is undefined or the name field is empty', () => {
            let error = exception.getKnownError(undefined);

            const errorExpected = new exception.InternalServerError();

            expect(errorExpected).toEqual(error);

            error = exception.getKnownError(mock.ExceptionWithoutName);

            expect(errorExpected).toEqual(error);
        })

        it('should return the error itself if the error is not known', () => {
            const error = exception.getKnownError(new mock.UnexpectedException());

            const expectedError = new mock.UnexpectedException();

            expect(expectedError).toEqual(error);
        })
    })
});