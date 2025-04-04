const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');
const upload = require('../config/multer');
const loggingMiddleware = require('../middlewares/loggingMiddleware');

router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);
router.post(
    "/",
    upload.single("logo"),
    loggingMiddleware,
    categoryController.createCategory
  );
  router.put(
    "/:id",
    upload.single("logo"),
    loggingMiddleware,
    categoryController.updateCategory
  );
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;
