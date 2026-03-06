
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

module.exports = {
    indexOfCount
}
