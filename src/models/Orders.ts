import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../database';

interface OrderAttributes {
  id: number;
  user_id: number;
}

// Use `Optional` for creation attributes that are optional or managed by Sequelize
interface OrderCreationAttributes extends Optional<OrderAttributes, 'id'> {}

class Order extends Model<OrderAttributes, OrderCreationAttributes> implements OrderAttributes {
  public id!: number;
  public user_id!: number;

  // No need to declare createdAt or updatedAt here, Sequelize manages them automatically
}

Order.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
}, {
  sequelize, // passing the `sequelize` instance is required
  tableName: 'orders',
  // Enable Sequelize to manage `createdAt` and `updatedAt` automatically
  timestamps: true,
});

export default Order;
