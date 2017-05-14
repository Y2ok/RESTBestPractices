exports.up = function(knex, Promise) {
    return knex.schema.createTable('status-logs', (table) => {
        table.increments();
        table.string('caller').notNullable();
        table.dateTime('date-time').notNullable();
        table.integer('status').notNullable();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('status-logs');
};
