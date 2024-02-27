import { DataTypes } from 'sequelize';
import {sequelize} from '../database';

const GroceryItems = sequelize.define('GroceryItems', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  inventory_count: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default GroceryItems;
