
exports.up = function(knex) {
    return knex.schema.alterTable('transactions', function(table) {
        table.decimal("sub_total", null).alter();
        table.decimal("tax_rate", null).alter();
        table.decimal("tax_amount", null).alter();
        table.decimal("discount_rate", null).alter();
        table.decimal("discount_amount", null).alter();
        table.decimal("coupon_rate", null).alter();
        table.decimal("coupon_amount", null).alter();
        table.decimal("wallet_amount", null).alter();
    });
};

exports.down = function(knex) {
    return knex.schema.alterTable('transactions', function(table) {
    });
};
