import Heroku from 'heroku-client';
import Debug from 'debug';

import Deploy from './../db/Deploy';
import Repository from './../db/Repository';

const heroku = new Heroku({ token: process.env.HEROKU_API_TOKEN });
const debug = Debug('heroku-button-bot:deploy');

export default async function deploy(gitHubUrl = process.env.GITHUB_URL) {
  const tarballUrl = `${gitHubUrl}/archive/master.tar.gz`;
  const requestBody = {
    app: { organization: process.env.HEROKU_DEPLOY_ORGANIZATION },
    source_blob: { url: tarballUrl },
  };

  debug(`Request body: `, requestBody);

  let appSetup = null;
  let error = null;
  try {
    const appSetup = await heroku.post('/app-setups', { body: requestBody });
    return appSetup;
  } catch (e) {
    error = e;
    console.log(`Error creating app-setup.`, error);
  }

  if (error) {
    // TODO: retry? save error to DB?
  } else {
    // TODO: save status to DB
    Repository.query().allowUpsert('[repository]').upsertGraph;

    Deploy.query()
      .allowInstert('[repository]')
      .insertGraph({});
  }
}
