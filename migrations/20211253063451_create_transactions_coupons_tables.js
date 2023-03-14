
exports.up = function(knex) {
    return knex.schema.createTable('transactions_coupons', function(table) {
        table.increments();

        table.bigInteger('transaction_id').unsigned();
        table.bigInteger('coupon_id').unsigned();

        table.datetime('created_at').defaultTo(knex.fn.now());
        table.datetime('updated_at').defaultTo(knex.fn.now());
        table.datetime('deleted_at');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('transactions_coupons');
};
