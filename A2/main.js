const randomNumber = require('./random.js');



const number1 = randomNumber(1,1000);

console.log("RNumber 1:",number1);

const number2 = randomNumber(1,1000);

console.log("RNumber 2:",number2);



const sum = number1 + number2;

const difference = number1 - number2;

const product = number1 * number2;

const quotient = number1 / number2;

const rem = number1 % number2;



console.log("Sum :",sum);

console.log("Difference :", difference);

console.log("Product :",product);

console.log("Quotient :",quotient);

console.log("Remainder :",rem);

