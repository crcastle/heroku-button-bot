require('./util/crashUnhandledRejection');

import Debug from 'debug';
import Knex from 'knex';
import { Model } from 'objection';

import delay from './util/delay';
import deploy from './lib/deploy';
import getStatus from './lib/getStatus';
import knexConfig from './knexfile';

const debug = Debug('heroku-button-bot:main');

// Setup DB
const knex = Knex(knexConfig[process.env.NODE_ENV || 'development']);
Model.knex(knex);

async function main(url) {
  let appSetup = await deploy(url);
  debug(appSetup);

  // TODO: replace with queueing a scheduled job to run every 5 sec until succeeded or failed
  while (appSetup.status === 'pending') {
    appSetup = await getStatus(appSetup.id);
    debug('===== Current status:');
    debug(appSetup);
    await delay(1000);
  }
}

main(process.env.GITHUB_URL)
  .then()
  .catch(e => {
    console.log(`Error`, e);
  });
