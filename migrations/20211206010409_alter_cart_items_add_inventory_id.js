
exports.up = function(knex) {
    return knex.schema.alterTable('cart_items', function(table) {
        table.bigInteger('inventory_id').unsigned();
    });
};

exports.down = function(knex) {
    return knex.schema.alterTable('cart_items', function(table) {
        table.dropColumn('inventory_id');
    });
};
