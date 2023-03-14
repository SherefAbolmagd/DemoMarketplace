
exports.up = function(knex) {
    return knex.schema.alterTable('inventories', function(table) {
        table.decimal("voucher_value",null);
        table.tinyint("product_type");
    });
};

exports.down = function(knex) {
    return knex.schema.alterTable('inventories', function(table) {
        table.dropColumn("voucher_value");
        table.dropColumn("product_type");
    });
};
