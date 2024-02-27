import express from 'express';
const router = express.Router();

// Import your models here
import GroceryItems from '../models/GroceryItems';

// Add New Grocery Item
router.post('/grocery-items', async (req, res) => {
    try {
        const { name, price, inventory_count } = req.body;
        const newItem = await GroceryItems.create({
            name,
            price,
            inventory_count,
        });
        return res.status(201).json(newItem);
    } catch (error) {
        return res.status(500).json({ error: error });
    }
});

// View Existing Grocery Items
router.get('/grocery-items', async (req, res) => {
    try {
        const items = await GroceryItems.findAll(); // Sequelize method to get all entries
        return res.status(200).json(items);
    } catch (error) {
        return res.status(500).json({ error: error });
    }
});

 
// Remove Grocery Item
router.delete('/grocery-items/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deleted = await GroceryItems.destroy({
            where: { id }
        });
        if (deleted) {
            return res.status(200).send("Grocery item deleted successfully.");
        } else {
            throw new Error("Grocery item not found.");
        }
    } catch (error) {
        return res.status(500).json({ error: error });
    }
});

// Update Grocery Item Details
router.put('/grocery-items/:id', async (req, res) => {
    try {
        const { name, price, inventory_count } = req.body;
        const id = req.params.id;
        const updated = await GroceryItems.update({ name, price, inventory_count }, {
            where: { id }
        });
        if (updated[0] > 0) { // Sequelize update returns an array with the number of affected rows
            return res.status(200).json({ message: "Grocery item updated." });
        }
        throw new Error("Grocery item not found.");
    } catch (error) {
        return res.status(500).json({ error: error });
    }
});
// Manage Inventory Levels
router.patch('/grocery-items/:id/inventory', async (req, res) => {
    try {
        const { inventory_count } = req.body;
        const id = req.params.id;
        const updated = await GroceryItems.update({ inventory_count }, {
            where: { id }
        });
        if (updated[0] > 0) {
            return res.status(200).json({ message: "Inventory level updated." });
        }
        throw new Error("Grocery item not found.");
    } catch (error) {
        return res.status(500).json({ error: error });
    }
});


export default router;
