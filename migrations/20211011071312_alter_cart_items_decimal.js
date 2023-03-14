
exports.up = function(knex) {
    return knex.schema.alterTable('cart_items', function(table) {
        table.decimal("price", null).alter();

        table.decimal("comission_rate", null).alter();
        table.decimal("comission_amount", null).alter();

        table.decimal("discount_rate", null).alter();
        table.decimal("discount_amount", null).alter();

        table.decimal("coupon_rate", null).alter();
        table.decimal("coupon_amount", null).alter();
    });
};

exports.down = function(knex) {
    return knex.schema.alterTable('cart_items', function(table) { });
};
