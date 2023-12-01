const fs = require('fs');

function calculateCalibrationSum(filePath) {
  let totalSum = 0;

  // Read the calibration document from the specified file
  const calibrationDocument = fs.readFileSync(filePath, 'utf-8').split('\n');

  // Iterate through each line in the calibration document
  calibrationDocument.forEach((line) => {
    // Filter out non-numeric characters and extract the digits
    const digits = line.match(/\d/g);

    if (digits) {
      // Extract the first and last digits from the filtered array
      const firstDigit = parseInt(digits[0], 10);
      const lastDigit = parseInt(digits[digits.length - 1], 10);

      // Calculate the calibration value and add it to the total sum
      const calibrationValue = (firstDigit * 10) + lastDigit;
      totalSum += calibrationValue;
    }
  });

  return totalSum;
}

// Replace 'Your_File_Path' with the actual path to your calibration document
const filePath = '.calibrationDocument.txt';

const result = calculateCalibrationSum(filePath);
console.log("The sum of all calibration values is:", result);
