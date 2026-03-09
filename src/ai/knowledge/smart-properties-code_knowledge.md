# Smart Properties Code Language definition

Smart Properties Code Language is a beginner-friendly, clean and readable pseudocode language.
It is a weakly typed language where reserved words must begin with the first letter in capital letters and the variables must begin with the first letter in lowercase.
It supports variables, expressions, conditional statements, and loops.
Types are inferred at runtime and do not need explicit declarations. The variable type can change depending of the type of the expression assigned
Newlines matter to indicate the end of a statement.
It can be unssigned variables, those variables are input variables whose values can be passed through in the test cases later.
The return statement is optional and should be only at the end the main block.
An array can support multiple types of values

---

## Design Goals

- Easy to read
- Minimal syntax
- No type declarations
- Clear control flow

---

## Lexical Rules

All syntax reserved words:

- If
- Then
- Else
- While
- End
- Return
- And
- Or
- True
- False

All supported types:

- string
- int
- float
- boolean
- array

All supported functions:

 - Sqrt: function that returns the square root of a number
  - Parameters:
    1. float or int
  - Returns: float
  - Example: Sqrt(9) -> 3

 - Array: function that returns an array type
  - Parameters: (none)
  - Returns: array (empty array)
  - Example: values = Array()

 - Get: function that returns the value from the array at certain position
  - Parameters:
    1. array: the array
    2. int: position
  - Returns: the value in the position
  - Example: Get(values, 2) -> "val2"

 - Length: function to get the array length
  - Parameters:
    1. array: the array
  - Returns: int (the array length)
  - Example: Length(values) -> 10

 - Push: function that adds a value to the end of the array
  - Parameters:
    1. array: the array
    2. any: the value to add
  - Example: Push(values, "val3")

 - Pop: function that removes and returns the last value of the array
  - Parameters:
    1. array: the array
  - Returns: any (the removed last value)
  - Example: Pop(values) -> "val3"

 - Unshift: function that adds a value to the beginning of the array
  - Parameters:
    1. array: the array
    2. any: the value to add
  - Example: Unshift(values, "val0")

 - Shift: function that removes and returns the first value of the array
  - Parameters:
    1. array: the array
  - Returns: any (the removed first value)
  - Example: Shift(values) -> "val0"

 - Pushall: function that adds all values from one array to the end of another array
  - Parameters:
    1. array: target array
    2. array: source array
  - Example: Pushall(values, otherValues)

 - Print: function that outputs a value to the console
  - Parameters:
    1. any: the value to print
  - Example: Print("Hello")


## Operators

| Operator | Description |
|--------|-------------|
| + | addition or string concatenation |
| * | multiply |
| / | divide |
| = | equality or assignment |
| > | greater than |
| < | less than |
| And | logical AND |
| Or | logical OR |
| Not | logical Not |

- There is no a "not equals" operator, you can use `Not` instead like: `NOT (a = 20)`

---

## Code definitions:

Assignmet:
```
variable01 = "Hello"
a = 1.25
b = True
c = 10
d = (a + c) / 10
```

Expression:
```
( -10.25 + a * c ) / 10
( a > c And a = 0 ) Or b
```

Control instruction `If-Else`:
```
If a > 5 Then
  b = 125.50
Else If a = 1 Then
  b = 75.25
Else 
  b = 0.00
End
Return b
```

Loop instruction `While`:
```
c = 0
While c < 20 Then
  Print(c)
  c = c + 2
End
```

Return instruction `Return`:
```
Return a + c
```

---

## Test cases
To be able to test the code, a JSON Array test case can be generated with the missing unassigned variable and the expected value result.

Json Schema:
```
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Test Cases",
  "type": "array",
  "items": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "description": "The name of the test case."
      },
      "variables": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "name": { "type": "string" },
            "type": { 
              "type": "string",
              "enum": ["string", "boolean", "float", "int"] 
            },
            "value": { "type": "string" }
          },
          "required": ["name", "type", "value"]
        }
      },
      "expected": {
        "type": "object",
        "properties": {
          "type": { "type": "string" },
          "value": { "type": "string" }
        },
        "required": ["type", "value"]
      }
    },
    "required": ["name", "variables"]
  }
}
```

Example: `[ { "name" : "Registered user with credit Test", "variables" : [ {"name":"rol","type":"string","value":"registered"}, {"name":"creditClient","type":"boolean","value":"true"}, {"name":"orderAmount","type":"float","value":"118.5"} ], "expected" : {"type":"string","value":"account,address,password,credit"} } ]`

---

## Example 1:
This code assigns a promotional code based on the order amount.

Code:
```
If orderAmount < 500 Then
  promoCode = "promo-code-10"
Else
  promoCode = "promo-code-20"
End
Return promoCode
```

Test cases: `[ { "name" : "Order greater than 500 Test", "variables" : [ {"name":"orderAmount","type":"float","value":"750.99"} ], "expected" : {"type":"string","value":"promo-code-20"} }, { "name" : "Order less than 500 Test", "variables" : [ {"name":"orderAmount","type":"float","value":"245.50"} ], "expected" : {"type":"string","value":"promo-code-10"} } ]`

---

## Example 2:
This code generates a list of payment methods based on the user's role, credit status and order total amount.

Code:
```
paymentMethods = Array()
IF rol = "representative" THEN   
   Push(paymentMethods, "payWithLink")
ELSE
   Push(paymentMethods, "creditCard")
   Push(paymentMethods, "paypal")
   IF creditClient THEN
      Push(paymentMethods, "smartShopCredit")
   END
END
IF totalAmount < 1250 THEN
   Push(paymentMethods, "billMeLater")
END
RETURN paymentMethods
```

Test cases: `[{"name":"Representative user with total amount less than 1250","variables":[{"name":"rol","type":"string","value":"representative"},{"name":"creditClient","type":"boolean","value":"false"},{"name":"totalAmount","type":"float","value":"1000"}],"expected":{"type":"array","value":"payWithLink,billMeLater"}},{"name":"Representative user with total amount greater than or equal to 1250","variables":[{"name":"rol","type":"string","value":"representative"},{"name":"creditClient","type":"boolean","value":"false"},{"name":"totalAmount","type":"float","value":"1250"}],"expected":{"type":"array","value":"payWithLink"}},{"name":"Regular user with credit client and total amount less than 1250","variables":[{"name":"rol","type":"string","value":"regular"},{"name":"creditClient","type":"boolean","value":"true"},{"name":"totalAmount","type":"float","value":"1000"}],"expected":{"type":"array","value":"creditCard,paypal,smartShopCredit,billMeLater"}},{"name":"Regular user without credit client and total amount less than 1250","variables":[{"name":"rol","type":"string","value":"regular"},{"name":"creditClient","type":"boolean","value":"false"},{"name":"totalAmount","type":"float","value":"1000"}],"expected":{"type":"array","value":"creditCard,paypal,billMeLater"}},{"name":"Regular user with credit client and total amount greater than or equal to 1250","variables":[{"name":"rol","type":"string","value":"regular"},{"name":"creditClient","type":"boolean","value":"true"},{"name":"totalAmount","type":"float","value":"1250"}],"expected":{"type":"array","value":"creditCard,paypal,smartShopCredit"}},{"name":"Regular user without credit client and total amount greater than or equal to 1250","variables":[{"name":"rol","type":"string","value":"regular"},{"name":"creditClient","type":"boolean","value":"false"},{"name":"totalAmount","type":"float","value":"1250"}],"expected":{"type":"array","value":"creditCard,paypal"}}]`

---

## Example 3:
This code prints the first ten prime numbers

Code:
```
count = 0
number = 2
While count < 10 Then
  isPrime = True
  i = 2
  While i <= number / 2 Then
    temp = number - (i * (number / i))
    If temp = 0 Then
      isPrime = False
    End
    i = i + 1
  End
  If isPrime Then
    Print(number)
    count = count + 1
  End
  number = number + 1
End
```

Test cases: `[{"name":"Test","variables":[]}]`