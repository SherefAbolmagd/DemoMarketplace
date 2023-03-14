
exports.up = function(knex) {
    return knex.schema.table('orders', function(table) {
        table.decimal("item_count", null).alter();
    })
};

exports.down = function(knex) {
    return knex.schema.table('orders', function(table) {
    })
};
