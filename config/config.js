'use strict';
import path from 'path';
import url from 'url';

export const getConfig = () => {
  const config = {
    MODE: 'Development',
    PORT: process.env.PORT || 5000,
    MONGO_URL: process.env.MONGO_URL,
    UPLOAD_PATH: path.resolve(
      `${path.dirname(url.fileURLToPath(import.meta.url))}/../uploads`
    ),
    JWT_SECRET: process.env.JWT_SECRET || 'R4ND0M5TR1NG',
    JWT_EXPIRY_SECONDS: process.env.JWT_EXPIRY_SECONDS || 172800,
  };

  // Modify for Production
  if (process.env.NODE_ENV === 'production') {
    config.MODE = 'Production';
  }

  return config;
};
