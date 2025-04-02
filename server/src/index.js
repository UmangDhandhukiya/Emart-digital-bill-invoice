import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const prisma = new PrismaClient();
const app = express();

// Create the 'uploads' directory if it doesn't exist
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, 'public', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/'); // Save files in the 'public/uploads' folder
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage });

// Serve static files from the 'public' folder
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

app.use(cors());
app.use(bodyParser.json());

// Registration Route
app.post('/register', async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  try {
    const user = await prisma.user.create({
      data: { email, password }, // In a real app, hash the password before saving
    });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: 'User already exists' });
  }
});

// Login Route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (user && user.password === password) {
    res.json({ message: 'Login successful', user });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Route to fetch all users
app.get('/displayuser', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete particular user
app.delete('/deleteusers/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.user.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Admin: Add Category with Image Upload
app.post('/categories', upload.single('image'), async (req, res) => {
  const { name } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  console.log('Request body:', req.body);
  console.log('Uploaded file:', req.file);

  try {
    const category = await prisma.category.create({
      data: { name, image },
    });
    res.json(category);
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(400).json({ error: 'Failed to create category' });
  }
});

// Admin: Update Category
app.put('/categories/:id', upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const updatedCategory = await prisma.category.update({
      where: { id: parseInt(id) },
      data: { name, image },
    });
    res.json(updatedCategory);
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(400).json({ error: 'Failed to update category' });
  }
});

// Admin: Delete Category
app.delete('/categories/:id', async (req, res) => {
  const { id } = req.params;

  // Check if the category exists first
  const category = await prisma.category.findUnique({ where: { id: parseInt(id) } });

  if (!category) {
    return res.status(404).json({ error: 'Category not found' });
  }

  try {
    await prisma.category.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ error: 'Failed to delete category' });
  }
});

// Admin: Add Product (Only Add Product Route)
app.post('/products', upload.single('image'), async (req, res) => {
  const { name, description, price, categoryId } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        image,
        categoryId: parseInt(categoryId),
      },
    });
    res.json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(400).json({ error: 'Failed to create product' });
  }
});

// Admin: Get All Products
app.get('/products', async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true, // Include category information in the product response
      },
    });
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Admin: Update Product
app.put('/products/:id', upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const { name, description, price, categoryId } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const updatedProduct = await prisma.product.update({
      where: { id: parseInt(id) },
      data: {
        name,
        description,
        price: parseFloat(price),
        image,
        categoryId: parseInt(categoryId),
      },
    });
    res.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(400).json({ error: 'Failed to update product' });
  }
});

// Admin: Delete Product
app.delete('/products/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.product.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// User: Get All Categories
app.get('/usercategories', async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// User: Get Products by Category
app.get('/products/category/:categoryId', async (req, res) => {
  const { categoryId } = req.params;
  try {
    const products = await prisma.product.findMany({
      where: { categoryId: parseInt(categoryId) },
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
