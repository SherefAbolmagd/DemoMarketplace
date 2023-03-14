exports.up = function(knex) {
    return knex.schema.createTable('customers', function(table) {
        table.increments();
        table.bigInteger('user_id').unsigned().index().references('id').inTable('users');
        table.datetime('created_at').defaultTo(knex.fn.now());
        table.datetime('updated_at').defaultTo(knex.fn.now());
        table.datetime('deleted_at');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('customers');
};
