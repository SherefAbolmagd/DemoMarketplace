
exports.up = function(knex) {
    return knex.schema.createTable('orders', function(table) {
        table.increments();
        table.bigInteger('transaction_id').unsigned().index().references('id').inTable('transactions');
        table.bigInteger('store_id').unsigned().index().references('id').inTable('stores');
        table.bigInteger('delivery_id').unsigned().index().references('id').inTable('deliveries');
        table.tinyint('order_status').unsigned();
        table.decimal('sub_total');
        table.decimal('delivery_amount');
        table.decimal("discount");
        table.decimal("coupon");
        table.decimal("platform_comission");
        table.datetime('created_at').defaultTo(knex.fn.now());
        table.datetime('updated_at').defaultTo(knex.fn.now());
        table.datetime('deleted_at');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('orders');
};
