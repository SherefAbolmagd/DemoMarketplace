exports.up = function(knex) {
    return knex.schema.createTable('transactions', function(table) {
        table.increments();
        table.uuid('ref_id');
        
        table.bigInteger('address_id').unsigned();
        table.bigInteger('customer_id').unsigned();
        table.bigInteger('business_id').unsigned();
        table.bigInteger('payment_id').unsigned();
        table.bigInteger('wallet_id').unsigned();
        
        table.boolean("apply_wallet");
        
        table.decimal("sub_total");
        table.decimal("tax_rate");
        table.decimal("tax_amount");
        table.decimal("discount_rate");
        table.decimal("discount_amount");
        table.decimal("coupon_rate");
        table.decimal("coupon_amount");
        table.decimal("wallet_amount");
        
        table.jsonb('metadata');
        
        table.datetime('created_at').defaultTo(knex.fn.now());
        table.datetime('updated_at').defaultTo(knex.fn.now());
        table.datetime('deleted_at');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('transactions');
};