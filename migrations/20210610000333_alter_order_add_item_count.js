
exports.up = function(knex) {
    return knex.schema.table('orders', function(table) {
        table.integer("item_count");
    })
};

exports.down = function(knex) {
    return knex.schema.table('orders', function(table) {
        table.dropColumn("item_count");
    })
};
