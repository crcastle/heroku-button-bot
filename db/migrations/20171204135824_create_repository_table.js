const PENDING = 'pending',
  BUILD_FAIL = 'build fail',
  RUN_FAIL = 'run fail',
  SUCCESS = 'success';

exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('repository', t => {
      t.uuid('id').primary();
      t.string('url').notNullable();
      t.boolean('requiresEnvVars');
      t.boolean('requiresVerifiedAccount');
      t.boolean('requiresNonFreeAddOns');
      t.boolean('readmeContainsButton');
      t.timestamps(true, true);
    })
    .createTable('deploy', t => {
      t.uuid('id').primary();
      t.string('appSetupId');
      t
        .uuid('repositoryId')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('repository');
      t
        .enu('status', [PENDING, BUILD_FAIL, RUN_FAIL, SUCCESS])
        .defaultTo(PENDING);
      t.string('buildLogUrl');
      t.string('runtimeLogUrl');
      t.text('successUrlHttpResponse');
      t.timestamps(true, true);
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('deploy')
    .dropTableIfExists('repository');
};
