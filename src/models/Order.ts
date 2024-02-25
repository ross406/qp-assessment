import { DataTypes } from 'sequelize';
import {sequelize} from '../database';

const Order = sequelize.define('Order', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

export default Order;
