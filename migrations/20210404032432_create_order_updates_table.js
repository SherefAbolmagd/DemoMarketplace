
exports.up = function(knex) {
    return knex.schema.createTable('order_updates', function(table) {
        table.increments();
        table.tinyint('order_status');
        table.string('description');
        table.bigInteger('order_id').unsigned();
        table.datetime('created_at').defaultTo(knex.fn.now());
        table.datetime('updated_at').defaultTo(knex.fn.now());
        table.datetime('deleted_at');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('order_updates');
};
