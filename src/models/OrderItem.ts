import { DataTypes } from 'sequelize';
import {sequelize} from '../database';

const OrderItem = sequelize.define('OrderItem', {
  order_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Orders',
      key: 'id',
    },
  },
  grocery_item_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'GroceryItems',
      key: 'id',
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default OrderItem;
