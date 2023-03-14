
exports.up = function(knex) {
    return knex.schema.alterTable('reports', function(table) {
        table.decimal("store_subtotal", null).alter();
        table.decimal("store_discount", null).alter();
        table.decimal("store_coupon", null).alter();
    
        table.decimal("delivery_total", null).alter();
        
        table.decimal("platform_comission", null).alter();
    
        table.decimal("transaction_subtotal", null).alter();

        table.decimal("transaction_discount_rate", null).alter(); 
        table.decimal("transaction_discount_amount", null).alter();
        table.decimal("transaction_tax_rate", null).alter();
        table.decimal("transaction_tax_amount", null).alter();
        table.decimal("transaction_coupon_rate", null).alter();
        table.decimal("transaction_coupon_amount", null).alter();
        table.decimal("transaction_wallet_amount", null).alter();
        
        table.decimal('refund_total', null).alter();
    });
};

exports.down = function(knex) {
    return knex.schema.alterTable('reports', function(table) {
    });
};
