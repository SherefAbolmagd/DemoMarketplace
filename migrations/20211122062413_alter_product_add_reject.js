
exports.up = function(knex) {
    return knex.schema.table('products', function(table) {
        table.datetime('product_rejected_at');
        table.string('reason');
    })
};

exports.down = function(knex) {
    return knex.schema.table('products', function(table) {
        table.dropColumn("product_rejected_at");
        table.dropColumn("reason");
    })
};
