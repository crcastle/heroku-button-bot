const guid = require('objection-guid')();
import { Model } from 'objection';

export default class Repository extends guid(Model) {
  static tableName = "repository";

  static relationMappings = {
    deploys: {
      relation: Model.HasManyRelation,
      modelClass: `${__dirname}/db/Deploy`,
      join: {
        from: "repository.id",
        to: "deploy.repositoryId"
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
