const Category = require('../models/category.model');
const logger = require('../services/logger'); // Assuming you have a logger service

// Get all categories
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        logger.info('Fetched all categories successfully');
        res.status(200).json({ success: true, data: categories });
    } catch (error) {
        logger.error('Error fetching categories: ', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// Get category by ID
exports.getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            logger.warn(`Category with ID ${req.params.id} not found`);
            return res.status(404).json({ success: false, message: 'Category not found' });
        }
        logger.info(`Fetched category with ID ${req.params.id} successfully`);
        res.status(200).json({ success: true, data: category });
    } catch (error) {
        logger.error(`Error fetching category with ID ${req.params.id}: `, error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// Create a new category
exports.createCategory = async (req, res) => {
    try {
        const newCategory = await Category.create(req.body);
        logger.info('Created new category successfully');
        res.status(201).json({ success: true, data: newCategory });
    } catch (error) {
        logger.error('Error creating category: ', error);
        res.status(400).json({ success: false, message: 'Error creating category', error: error.message });
    }
};

// Update a category
exports.updateCategory = async (req, res) => {
    try {
        const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedCategory) {
            logger.warn(`Category with ID ${req.params.id} not found for update`);
            return res.status(404).json({ success: false, message: 'Category not found' });
        }
        logger.info(`Updated category with ID ${req.params.id} successfully`);
        res.status(200).json({ success: true, data: updatedCategory });
    } catch (error) {
        logger.error(`Error updating category with ID ${req.params.id}: `, error);
        res.status(400).json({ success: false, message: 'Error updating category', error: error.message });
    }
};

// Delete a category
exports.deleteCategory = async (req, res) => {
    try {
        const deletedCategory = await Category.findByIdAndDelete(req.params.id);
        if (!deletedCategory) {
            logger.warn(`Category with ID ${req.params.id} not found for deletion`);
            return res.status(404).json({ success: false, message: 'Category not found' });
        }
        logger.info(`Deleted category with ID ${req.params.id} successfully`);
        res.status(200).json({ success: true, message: 'Category deleted successfully' });
    } catch (error) {
        logger.error(`Error deleting category with ID ${req.params.id}: `, error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};