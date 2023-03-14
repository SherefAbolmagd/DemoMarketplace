
exports.up = function(knex) {
    return knex.schema.alterTable('orders', function(table) {
        table.decimal('sub_total', null).alter();
        table.decimal('delivery_amount', null).alter();
        table.decimal("discount", null).alter();
        table.decimal("coupon", null).alter();
        table.decimal("platform_comission", null).alter();
    });
};

exports.down = function(knex) {
    return knex.schema.alterTable('orders', function(table) {
    });
};
