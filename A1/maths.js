// Retrieve the command line arguments
const [nodePath, scriptPath, num1, num2] = process.argv;

// Convert the input strings to numbers
const number1 = parseFloat(num1);
const number2 = parseFloat(num2);

// Check if the input is valid
if (isNaN(number1) || isNaN(number2)) {
  console.log('Please provide valid numbers as command line arguments.');
} else {
  // Perform arithmetic operations
  const sum = number1 + number2;
  const difference = number1 - number2;
  const product = number1 * number2;
  const quotient = number1 / number2;
  const rem = number1 % number2;

  // Display the results
  console.log(`Sum: ${sum}`);
  console.log(`Difference: ${difference}`);
  console.log(`Product: ${product}`);
  console.log(`Quotient: ${quotient}`);
  console.log(`Remainder: ${rem}`);
}
