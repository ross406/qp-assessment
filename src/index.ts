import express from 'express';
 // Import your sequelize connection and setup
import GroceryItem from './models/GroceryItem';
import dotenv from 'dotenv';

dotenv.config();

import {sequelize} from './database';

const app = express();
const PORT = 3000;


export const mySqlUserName =  process.env.MYSQL_USER_NAME ?? '';
export const mySqlPassword = process.env.MYSQL_PASSWORD ?? '';


// console.log("@@@MYSQL_USER_NAME",process.env.MYSQL_USER_NAME)
// console.log("@@@MYSQL_PASSWORD",process.env.MYSQL_PASSWORD)

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Grocery Booking API GG !!!!');
});

// Database initialization and then starting the server
sequelize.sync().then(() => {
  console.log('Database synced!');
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('Failed to sync database:', err);
});

