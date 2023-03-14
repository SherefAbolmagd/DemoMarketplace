exports.up = function(knex) {
    return knex.schema.createTable('deliveries', function(table) {
        table.increments();
        table.bigInteger('provider_id').unsigned();
        table.string("tracking_id");
        table.decimal("delivery_amount");
        table.string("tracking_uri");
        table.bigInteger('order_id').unsigned();
        table.datetime('created_at').defaultTo(knex.fn.now());
        table.datetime('updated_at').defaultTo(knex.fn.now());
        table.datetime('deleted_at');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('deliveries');
};
