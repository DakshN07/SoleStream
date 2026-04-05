const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./config/db');
const { startDailyRestock } = require('./cron/dailyRestock');

// Load env
dotenv.config();

// Connect DB
connectDB();

const app = express();
const server = http.createServer(app);

// Setup Socket.IO
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());

// Make io accessible to our router
app.set('io', io);

// Basic Route for testing
app.get('/', (req, res) => {
  res.json({ message: 'SoleStream API is Live and Running' });
});

app.get('/api/v1', (req, res) => {
  res.json({ message: 'Welcome to SoleStream API v1' });
});

// Import Routes
const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/product.routes');
const orderRoutes = require('./routes/order.routes');
const feedbackRoutes = require('./routes/feedback.routes');
const aiRoutes = require('./routes/ai.routes');

// Use Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/feedback', feedbackRoutes);
app.use('/api/v1/recommend-size', aiRoutes);

// Socket.io Connection Logic
io.on('connection', (socket) => {
  console.log(`Socket Connected: ${socket.id}`);
  
  socket.on('disconnect', () => {
    console.log(`Socket Disconnected: ${socket.id}`);
  });
});

// Start Daily Restock Cron Job
startDailyRestock(io);

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
