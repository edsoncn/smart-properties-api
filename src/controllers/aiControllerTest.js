const { response } = require('express');

const explainCode = (req, res) => {
    setTimeout(() => {
        res.status(200).send({ 
            fullDescription : "The code checks if the variable 'orderAmount' is less than 500. If it is, it assigns the value 'promo-code-10' to the variable 'promoCode'. If 'orderAmount' is 500 or more, it assigns 'promo-code-20' to 'promoCode'. Finally, it returns the value of 'promoCode'. The code checks if the variable 'orderAmount' is less than 500. If it is, it assigns the value 'promo-code-10' to the variable 'promoCode'. If 'orderAmount' is 500 or more, it assigns 'promo-code-20' to 'promoCode'. Finally, it returns the value of 'promoCode'. The code checks if the variable 'orderAmount' is less than 500. If it is, it assigns the value 'promo-code-10' to the variable 'promoCode'. If 'orderAmount' is 500 or more, it assigns 'promo-code-20' to 'promoCode'. Finally, it returns the value of 'promoCode'. The code checks if the variable 'orderAmount' is less than 500. If it is, it assigns the value 'promo-code-10' to the variable 'promoCode'. If 'orderAmount' is 500 or more, it assigns 'promo-code-20' to 'promoCode'. Finally, it returns the value of 'promoCode'. The code checks if the variable 'orderAmount' is less than 500. If it is, it assigns the value 'promo-code-10' to the variable 'promoCode'. If 'orderAmount' is 500 or more, it assigns 'promo-code-20' to 'promoCode'. Finally, it returns the value of 'promoCode'. The code checks if the variable 'orderAmount' is less than 500. If it is, it assigns the value 'promo-code-10' to the variable 'promoCode'. If 'orderAmount' is 500 or more, it assigns 'promo-code-20' to The code checks if the variable 'orderAmount' is less than 500. If it is, it assigns the value 'promo-code-10' to the variable 'promoCode'. If 'orderAmount' is 500 or more, it assigns 'promo-code-20' to 'promoCode'. Finally, it returns the value of 'promoCode'.The code checks if the variable 'orderAmount' is less than 500. If it is, it assigns the value 'promo-code-10' to the variable 'promoCode'. If 'orderAmount' is 500 or more, it assigns 'promo-code-20' to 'promoCode'. Finally, it returns the value of 'promoCode'.The code checks if the variable 'orderAmount' is less than 500. If it is, it assigns the value 'promo-code-10' to the variable 'promoCode'. If 'orderAmount' is 500 or more, it assigns 'promo-code-20' to 'promoCode'. Finally, it returns the value of 'promoCode'.'promoCode'. Finally, it returns the value of 'promoCode'."})
    }, 750)
}

const generateTestCases = (req, res) => {
    setTimeout(() => {
        res.status(200).send(formatResponse({
                    "code": "",
                    "testCases": [
                        {
                            "name": "Test case 1",
                            "variables": [
                                {"name": "rol", "type": "string", "value": "guest"},
                                {"name": "hasHistoricalOrders", "type": "boolean", "value": false},
                                {"name": "creditClient", "type": "boolean", "value": false}
                            ],
                            "expected": {"type": "string", "value": "login,register"}
                        },
                        {
                            "name": "Test case 2",
                            "variables": [
                                {"name": "rol", "type": "string", "value": "registered"},
                                {"name": "hasHistoricalOrders", "type": "boolean", "value": true},
                                {"name": "creditClient", "type": "boolean", "value": true}
                            ],
                            "expected": {"type": "string", "value": "account,address,history,tracking,password,credit"}
                        },
                        {
                            "name": "Test case 3",
                            "variables": [
                                {"name": "rol", "type": "string", "value": "registered"},
                                {"name": "hasHistoricalOrders", "type": "boolean", "value": false},
                                {"name": "creditClient", "type": "boolean", "value": true}
                            ],
                            "expected": {"type": "string", "value": "account,address,password,credit"}
                        },
                        {
                            "name": "Test case 4",
                            "variables": [
                                {"name": "rol", "type": "string", "value": "registered"},
                                {"name": "hasHistoricalOrders", "type": "boolean", "value": true},
                                {"name": "creditClient", "type": "boolean", "value": false}
                            ],
                            "expected": {"type": "string", "value": "account,address,history,tracking,password"}
                        },
                        {
                            "name": "Test case 5",
                            "variables": [
                                {"name": "rol", "type": "string", "value": "registered"},
                                {"name": "hasHistoricalOrders", "type": "boolean", "value": false},
                                {"name": "creditClient", "type": "boolean", "value": false}
                            ],
                            "expected": {"type": "string", "value": "account,address,password"}
                        },
                        {
                            "name": "Test case 6",
                            "variables": [
                                {"name": "rol", "type": "string", "value": "representative"},
                                {"name": "hasHistoricalOrders", "type": "boolean", "value": false},
                                {"name": "creditClient", "type": "boolean", "value": false}
                            ],
                            "expected": {"type": "string", "value": "account,represent,address,history,password"}
                        },
                        {
                            "name": "Test case 7",
                            "variables": [
                                {"name": "rol", "type": "string", "value": "unknown"},
                                {"name": "hasHistoricalOrders", "type": "boolean", "value": false},
                                {"name": "creditClient", "type": "boolean", "value": false}
                            ],
                            "expected": {"type": "string", "value": "login,register"}
                        }
                    ],
                    "description": "",
                    "fullDescription": "",
                    "generateCodeFlag": false
                }))
    }, 750)
}

const generateCode = (req, res) => {
    setTimeout(() => {
        res.status(200).send({
            "code": "If orderAmount < maxPromoThreshold Then\n  promoCode = \"promo-code-15\"\nElse\n  promoCode = \"promo-code-10\"\nEnd\nReturn promoCode",
            "description": "Determines the promo code based on the order amount compared to the max promo threshold.",
            "fullDescription": "This code checks if the order amount is less than a specified maximum promo threshold. If it is, it assigns the promo code 'promo-code-15'. If the order amount is equal to or greater than the threshold, it assigns 'promo-code-10'. Finally, it returns the selected promo code.",
            "generateCodeFlag": true
        })
    }, 750)
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
    generateCode
}