
const DUPLICATE = 'duplicate';
const NOT_FOUND = 'notFound';
const UNAUTHORIZED = 'unauthorized';
const FORBIDDEN = 'forbidden' ;
const SERVER_ERROR = 'serverError' ;

const DUPLICATE_CODE = 409;
const NOT_FOUND_CODE = 404;
const UNAUTHORIZED_CODE = 401;
const FORBIDDEN_CODE = 403;
const SERVER_ERROR_CODE = 500;

const createNewError = (message, code, name) => {
    let error = new Error(message);    
    error.name = [code, name].join(':')
    return error;
}

const duplicateError = createNewError('duplicate error', DUPLICATE_CODE, DUPLICATE);

const notFoundError = createNewError('not found error', NOT_FOUND_CODE, NOT_FOUND);

const unauthorizedError = createNewError('unauthorized error', UNAUTHORIZED_CODE, UNAUTHORIZED);

const forbiddenError = createNewError('forbidden error', FORBIDDEN_CODE, FORBIDDEN);

const serverError = createNewError('internal server error', SERVER_ERROR_CODE, SERVER_ERROR);

const handleError = (e) => {
    handleErrorResponse(e);
}
const handleErrorResponse = (e, res) => {
    if(e instanceof Error && /[0-9]+:[a-zA-Z]+$/.test(e.name)) {
        let errorNameSplit = e.name.split(':');
        let code = parseInt(errorNameSplit[0]);

        console.warn(e.message);
        if(res) res.status(code).send({ errorMessage: e.message});
    } else {
        console.error(e);
        if(res) res.status(500).send({ errorMessage: "An error occurred: " + e});
    }
}

const isDuplicateError = (e) => {
    return checkError(e, DUPLICATE_CODE)
}

const isNotFoundError = (e) => {
    return checkError(e, NOT_FOUND_CODE)
}

const isAuthorizedError = (e) => {
    return checkError(e, UNAUTHORIZED_CODE)
}

const isForbiddenError = (e) => {
    return checkError(e, FORBIDDEN_CODE)
}

const isServerError = (e) => {
    return checkError(e, SERVER_ERROR_CODE)
}

const checkError = (e, code) => {
    return e.name && e.name.startsWith(code + ':');
}

module.exports = {
    DUPLICATE,
    NOT_FOUND,
    UNAUTHORIZED,
    FORBIDDEN,
    SERVER_ERROR,
    duplicateError,
    notFoundError,
    unauthorizedError,
    forbiddenError,
    serverError,
    handleError,
    handleErrorResponse,
    isDuplicateError,
    isNotFoundError,
    isAuthorizedError,
    isForbiddenError,
    isServerError
}