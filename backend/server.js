require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/configs/database');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
  } catch (error) {
    console.error('Starting without a MongoDB connection. Database-backed routes will fail until the credentials are fixed.');
  }

  const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });

  server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      console.error(`Port ${PORT} is already in use. Stop the existing process or change PORT in backend/.env.`);
      process.exit(1);
      return;
    }

    console.error('Server failed to start:', error.message);
    process.exit(1);
  });
};

startServer();
