const fs = require('fs');

const directoryPath = '\henhousepubs';

try {
  const files = fs.readdirSync(directoryPath);
  console.log(files);
} catch (error) {
  console.error('Error reading directory:', error);
}