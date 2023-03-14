
exports.up = function(knex) {
    return knex.schema.createTable('stocks', function(table) {
        table.increments();
        table.bigInteger('store_id');
        table.bigInteger('variant_id');
        table.bigInteger('cart_id');
        table.tinyint('type');
        table.decimal('quantity', null);
        table.datetime('created_at').defaultTo(knex.fn.now());
        table.datetime('updated_at').defaultTo(knex.fn.now());
        table.datetime('deleted_at');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('stocks');
};
