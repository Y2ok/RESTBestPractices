exports.up = function(knex, Promise) {
    return knex.schema.createTable('logs', (table) => {
        table.increments();
        table.string('caller').notNullable();
        table.dateTime('date-time').notNullable();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('logs');
};
