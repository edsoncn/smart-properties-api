const { response } = require('express');
const aiCodeAssistant = require('../ai/aiCodeAssistantAzureAgent.js')
const userQuestions = require('../ai/userQuestions.js')
const exceptions = require('../configs/execeptionsConfig')

const explainCode = (req, res) => {
    const code = req.body.code;

    generateResponse(req, res, userQuestions.EXPLAIN_CODE_QUESTION(code));
}

const generateTestCases = (req, res) => {
    const code = req.body.code;

    generateResponse(req, res, userQuestions.GENERATE_TEST_CASES_QUESTION(code));
}

const generateCode = (req, res) => {
    const description = req.body.description;

    generateResponse(req, res, userQuestions.GENERATE_CODE_QUESTION(description));
}

const updateCode = (req, res) => {
    const code = req.body.code;
    const update = req.body.update;

    generateResponse(req, res, userQuestions.UPDATE_CODE_QUESTION(code, update));
}

const generateResponse = (req, res, question) => {
    aiCodeAssistant.generateResponse(question)
    .then(response => 
        res.status(200).send(formatResponse(response)))
    .catch(e => {
        exceptions.handleErrorResponse(e, res);
    })
}

const formatResponse = (response) => {
    if (response.testCases) {
        response.testCases.forEach(tvar => { 
            if (tvar.variables) { 
                tvar.variables.forEach(
                    v => { v.value = String(v.value)}) 
            } 
            if (tvar.expected) {
                tvar.expected.value = String(tvar.expected.value)
            }
        })
    }
    return response
}  

module.exports = {
    explainCode,
    generateTestCases,
    generateCode,
    updateCode
}