
const exceptions = require('../configs/execeptionsConfig');
const indexOfCount = (text, sequence, count) => {
    return indexOfCountRecursive(text, sequence, count, 1);
}

const indexOfCountRecursive = (text, sequence, count, times) => {
    let index = text.indexOf(sequence);
    if(count === times || index < 0) return index;
    let indexRecursive = indexOfCountRecursive(text.substring(index + sequence.length), sequence, count, times + 1);
    if(indexRecursive < 0) return indexRecursive;
    else return indexRecursive + index + sequence.length;
}

const validateNotEmpty = (obj, property, name) => {
    if (!obj[property] || obj[property].trim() === '') {
        throw exceptions.badRequestError(name);
    }
}
const validateEmail = (email) => {
    if (! /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
        throw exceptions.badRequestMsgError('Email is not valid');
    }
}
module.exports = {
    indexOfCount,
    validateNotEmpty,
    validateEmail
}
