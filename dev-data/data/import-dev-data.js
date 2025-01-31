const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const Tour = require('../../models/tourModel');

// Connect to MongoDB
mongoose
  .connect(process.env.DATABASE_LOCAL)
  .then(() => console.log('Connected to MongoDB'));

//   Read Json File
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf8')
);

// IMPORT DATA INTO DB

const importData = async () => {
  try {
    await Tour.insertMany(tours);
    console.log('Data imported successfully');
  } catch (error) {
    console.error('Error importing data', error);
  }
  process.exit();
};

// DESTROY DATA FROM DB

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data destroyed successfully');
  } catch (error) {
    console.error('Error destroying data', error);
  }
  process.exit();
};

// Uncomment the function you want to run
if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
} else {
  console.log('Please provide a command --import or --destroy');
}
