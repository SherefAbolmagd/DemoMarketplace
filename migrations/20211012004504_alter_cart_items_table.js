
exports.up = function(knex) {
    return knex.schema.alterTable('product_variants', function(table) {
        table.decimal("stock", null);
    });
};

exports.down = function(knex) {
    return knex.schema.alterTable('product_variants', function(table) {
        table.dropColumn("stock");
    });
};
