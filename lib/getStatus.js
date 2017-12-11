import Heroku from 'heroku-client';
import Debug from 'debug';

import Deploy from './../db/Deploy';

const heroku = new Heroku({ token: process.env.HEROKU_API_TOKEN });
const debug = Debug('heroku-button-bot:get-status');

export default async function getStatus(appSetupId) {
  let status = null;
  let error = null;
  try {
    status = await heroku.get(`/app-setups/${appSetupId}`);
    return status;
  } catch (e) {
    error = e;
    console.log(`Error getting app-setup status.`, error);
  }

  if (error) {
    // TODO: retry? save error to DB?
  } else {
    // TODO: save status to DB
    Deploy.query().insert();
  }
}
