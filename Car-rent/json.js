const fs = require('fs');

// Function to read JSON data from a file
function jsonReader(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // Handle errors, e.g., file not found or invalid JSON
    console.error('Error reading JSON file:', error);
    return null;
  }
}

// Function to save data to a JSON file
function saveDataToFile(data, filePath) {
  try {
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(filePath, jsonData, 'utf-8');
    console.log('Data saved to JSON file successfully.');
  } catch (error) {
    // Handle errors, e.g., permission issues
    console.error('Error saving data to JSON file:', error);
  }
}

// Function to generate the next available ID
function generateNextId(dataArray) {
  // Find the maximum ID in the existing data
  const maxId = dataArray.reduce((max, item) => (item.id > max ? item.id : max), 0);
  
  // Return the next available ID (one greater than the current maximum)
  return maxId + 1;
}

module.exports = { jsonReader, saveDataToFile, generateNextId };
