require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { initDB } = require('./db/database');
const productsRouter = require('./routes/products');
const categoriesRouter = require('./routes/categories');
const contactsRouter = require('./routes/contacts');
const blogRouter = require('./routes/blog');
const adminRouter = require('./routes/admin');
const ordersRouter = require('./routes/orders');

const app = express();
const PORT = process.env.PORT || 5014;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

initDB();

app.use('/api/products', productsRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/contacts', contactsRouter);
app.use('/api/blog', blogRouter);
app.use('/api/admin', adminRouter);
app.use('/api/orders', ordersRouter);

const server = app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`\nPort ${PORT} da duoc su dung. Chay lenh sau trong CMD de giai phong:\n`);
    console.error(`  FOR /F "tokens=5" %a IN ('netstat -ano ^| findstr :${PORT}') DO taskkill /PID %a /F\n`);
    process.exit(1);
  } else {
    throw err;
  }
});
