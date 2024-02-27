// import GroceryItems from './models/GroceryItems';
// import Orders from './models/Orders';
// import OrderItem from './models/OrderItem';

import { Sequelize } from 'sequelize';
import { DataTypes } from 'sequelize';
// import {mySqlUserName,mySqlPassword} from './index'


const username = process.env.MYSQL_USER_NAME || "root";
const password = process.env.MYSQL_PASSWORD || "12345678";

// const username = process.env.MYSQL_USER_NAME as string;
// const password = process.env.MYSQL_PASSWORD as string;


// if (!username || !password) {
//   throw new Error('Required MYSQL environment variables are not set.');
// }

export const sequelize = new Sequelize("grocery", username!, password!, {
  dialect: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  omitNull: true,
  native: true,
    define: {
        underscored: true,
        freezeTableName: true,
        timestamps: true,
        charset: "utf8",
    },
});

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
  

Orders.hasMany(OrderItem, { foreignKey: 'order_id' });
OrderItem.belongsTo(Orders, { foreignKey: 'order_id' });

GroceryItems.hasMany(OrderItem, { foreignKey: 'grocery_item_id' });
OrderItem.belongsTo(GroceryItems, { foreignKey: 'grocery_item_id' });

sequelize.sync().then(() => {
    console.log('Database & tables created!');
    
    // Insert mock data
    // GroceryItems.bulkCreate([
    //   { name: 'Apples', price: 3.50, inventory_count: 100 },
    //   { name: 'Oranges', price: 2.30, inventory_count: 150 },
    //   // Add more items as needed
    // ]).then(() => console.log('Inserted mock grocery items'));
  });

export default sequelize;
