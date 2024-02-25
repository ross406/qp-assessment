import { DataTypes } from 'sequelize';
import {sequelize} from '../database';

console.log("@@@sequelize",sequelize)

const GroceryItem = sequelize.define('GroceryItem', {
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

export default GroceryItem;
