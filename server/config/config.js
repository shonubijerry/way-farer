import dotenv from 'dotenv';

dotenv.config();

/**
 * This is a configuration file that determinces which database configuration should
 * be used base on the environment we are running the app
 * @requires - dotenv
 * @exports - Config
 */

const currentEnv = process.env.NODE_ENV;

class Config {
  static getDbCredentials() {
    const credentials = {
      development: {
        dataURL: process.env.DEV_DB,
      },
      test: {
        dataURL: process.env.TEST_DB,
      },
      production: {
        dataURL: process.env.PRODUCTION_DB,
      },
    };
    return credentials[currentEnv];
  }
}

export default Config;
