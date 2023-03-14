
exports.up = function(knex) {
    return knex.schema.createTable('reports', function(table) {
        table.increments();
        table.bigInteger('store_id').unsigned();;
        table.tinyint("report_type");
        
        table.datetime('report_date');
        
        table.decimal("store_subtotal");
        table.decimal("store_discount");
        table.decimal("store_coupon");

        table.decimal("delivery_total");
        
        table.decimal("platform_comission");

        table.decimal("transaction_subtotal");
        table.decimal("transaction_wallet");
        table.decimal("transaction_delivery");
        table.decimal("transaction_tax");
        table.decimal("transaction_discount");
        table.decimal("transaction_coupon");
        table.decimal("transaction_rounding");
        table.decimal("transaction_fee");
        table.decimal("transaction_total");

        table.datetime('created_at').defaultTo(knex.fn.now());
        table.datetime('updated_at').defaultTo(knex.fn.now());
        table.datetime('deleted_at');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('reports');
};
