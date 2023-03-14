
exports.up = function(knex) {
    return knex.schema.alterTable('transactions', function(table) {
        table.decimal("sub_total", 16, 2).alter();
        table.decimal("tax_rate", 16, 2).alter();
        table.decimal("tax_amount", 16, 2).alter();
        table.decimal("discount_rate", 16, 2).alter();
        table.decimal("discount_amount", 16, 2).alter();
        table.decimal("coupon_rate", 16, 2).alter();
        table.decimal("coupon_amount", 16, 2).alter();
        table.decimal("wallet_amount", 16, 2).alter();
    });
};

exports.down = function(knex) {
    return knex.schema.alterTable('transactions', function(table) {
    });
};
