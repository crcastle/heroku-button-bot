const guid = require('objection-guid')();
import { Model } from 'objection';

export default class Deploy extends guid(Model) {
  static tableName = "delpoy";

  static relationMappings = {
    repository: {
      relation: Model.BelongsToOneRelation,
      modelClass: `${__dirname}/db/Repository`,
      join: {
        from: "deploy.repositoryId",
        to: "repository.id"
      }
    }
  }

  $beforeInsert() {
    this.created_at = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }
}
