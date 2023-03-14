
exports.up = function(knex) {
    return knex.schema.createTable('webhook_requests', function(table) {
        table.increments();
        table.tinyint('status');
        table.jsonb('request');
        table.text('respond');
        table.tinyint('status_code');
        table.bigInteger('webhook_id').unsigned();
        table.datetime('created_at').defaultTo(knex.fn.now());
        table.datetime('updated_at').defaultTo(knex.fn.now());
        table.datetime('deleted_at');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('webhook_requests');
};
