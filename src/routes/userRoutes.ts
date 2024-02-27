import express from 'express';
const router = express.Router();
import { Sequelize, DataTypes, Op } from 'sequelize';


// Import your models here
import GroceryItem from '../models/GroceryItems';
import Order from '../models/Orders';
import OrderItem from '../models/OrderItem';
import sequelize from '../database';

// View List of Available Grocery Items
router.get('/grocery-items', async (req, res) => {
    try {
        const availableItems = await GroceryItem.findAll(
            {
            where: {
                inventory_count: {
                    [Op.gt]: 0 // Op.gt is the operator for 'greater than'
                }
            }
        }
        );
        return res.status(200).json(availableItems);
    } catch (error) {
        return res.status(500).json({ error: error });
    }
});

// Book Multiple Grocery Items
router.post('/orders', async (req, res) => {
    const { items } = req.body; // items is an array of { grocery_item_id, quantity }
    const transaction = await sequelize.transaction();

    try {
        // Create a new order
        const order = await Order.create({ user_id: 1 }, { transaction });

        for (const item of items) {
            const { grocery_item_id, quantity } = item;
            const groceryItem = await GroceryItem.findByPk(grocery_item_id, { transaction });

            if (!groceryItem || groceryItem.inventory_count < quantity) {
                throw new Error(`Item ${grocery_item_id} is not available in the desired quantity`);
            }

            // Decrease inventory count
            await GroceryItem.update({ inventory_count: groceryItem.inventory_count - quantity }, {
                where: { id: grocery_item_id },
                transaction
            });

            // Create order item
            await OrderItem.create({
                order_id: order.id,
                grocery_item_id,
                quantity
            }, { transaction });
        }

        await transaction.commit();
        return res.status(201).json({ message: "Order successfully placed." });
    } catch (error) {
        await transaction.rollback();
        return res.status(500).json({ error: error });
    }
});


export default router;
