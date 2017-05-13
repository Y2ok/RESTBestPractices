exports.up = function(knex, Promise) {
    return knex.schema.createTable('resources', (table) => {
        table.increments();
        table.string('name').notNullable();
        table.string('userId').notNullable();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('resources');
};
