import { setupServer } from './server.js';
import dotenv from 'dotenv';
import { initMongoConnection } from './db/initMongoConnection.js';

dotenv.config();

const app = setupServer();
const PORT = process.env.PORT || 3000;

const bootstrap = async () => {
  try {
    await initMongoConnection();
    console.log('MongoDB connection successfully established.');

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to initialize the app:', error);
  }
};

bootstrap();
