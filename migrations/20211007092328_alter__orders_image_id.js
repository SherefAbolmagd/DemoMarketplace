
exports.up = function(knex) {
    return knex.schema.alterTable('orders', function(table) {
        table.decimal('sub_total', 16, 2).alter();
        table.decimal('delivery_amount', 16, 2).alter();
        table.decimal("discount", 16, 2).alter();
        table.decimal("coupon", 16, 2).alter();
        table.decimal("platform_comission", 16, 2).alter();
    });
};

exports.down = function(knex) {
    return knex.schema.alterTable('orders', function(table) {
    });
};
