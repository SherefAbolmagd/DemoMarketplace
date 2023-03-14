
exports.up = function(knex) {
    return knex.schema.createTable('webhooks', function(table) {
        table.increments();
        table.string('webhook_event');
        table.string('webhook_uri');
        table.bigInteger('store_id').unsigned();
        table.datetime('created_at').defaultTo(knex.fn.now());
        table.datetime('updated_at').defaultTo(knex.fn.now());
        table.datetime('deleted_at');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('webhooks');
};
