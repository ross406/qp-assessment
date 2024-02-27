import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../database';

// Define attributes in the model
interface GroceryItemAttributes {
  id: number;
  name: string;
  price: number;
  inventory_count: number;
}

// Some attributes are optional when calling Model.create() or Model.build()
interface GroceryItemCreationAttributes extends Optional<GroceryItemAttributes, 'id'> {}

class GroceryItem extends Model<GroceryItemAttributes, GroceryItemCreationAttributes>
  implements GroceryItemAttributes {
  public id!: number; // Note: using ! asserts that this will be initialized
  public name!: string;
  public price!: number;
  public inventory_count!: number;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

GroceryItem.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
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
  },
  {
    tableName: 'groceryItems',
    sequelize, // passing the `sequelize` instance is required
  }
);

export default GroceryItem;
