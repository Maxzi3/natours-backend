const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app');

// Connect to MongoDB
mongoose
  .connect(process.env.DATABASE_LOCAL)
  .then(() => console.log('Connected to MongoDB'));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}...`));
