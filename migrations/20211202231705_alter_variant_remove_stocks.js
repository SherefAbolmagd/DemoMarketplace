
exports.up = function(knex) {
    return knex.schema.table('product_variants', function(table) {
        table.dropColumn("stock");
    })
};

exports.down = function(knex) {
    return knex.schema.table('product_variants', function(table) {
        table.decimal("stock", null);
    })
};
