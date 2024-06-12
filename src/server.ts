import { Server } from 'http';
import app from './app';
import mongoose from 'mongoose';
import config from './app/config';

let server: Server;

// Application connection maintaining function
async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    app.listen(config.port, () => {
      // eslint-disable-next-line no-console
      console.log(`app listening on port ${config.port}`);
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
}

// caling main function
main();

process.on('unhandledRejection', () => {
  console.log('unhandledRejection is detected, shutting down...');
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
});

process.on('uncaughtException', () => {
  console.log('uncaughtException is detected, shutting down...');
  process.exit(1);
});
