import { DataTypes } from 'sequelize';
import {sequelize} from '../database';

const Orders = sequelize.define('Orders', {
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

export default Orders;
