import { setupServer } from './server.js';
import dotenv from 'dotenv';
import { initMongoConnection } from './db/initMongoConnection.js';

import { createDirIfNotExists } from './utils/createDirIfNotExists.js';
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from './constants/index.js';

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
    await createDirIfNotExists(TEMP_UPLOAD_DIR);
    await createDirIfNotExists(UPLOAD_DIR);
  } catch (error) {
    console.error('Failed to initialize the app:', error);
  }
};

bootstrap();
