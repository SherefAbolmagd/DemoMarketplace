
exports.up = function(knex) {
    return knex.schema.alterTable('reports', function(table) {
        table.decimal("store_subtotal", 16, 2).alter();
        table.decimal("store_discount", 16, 2).alter();
        table.decimal("store_coupon", 16, 2).alter();
    
        table.decimal("delivery_total", 16, 2).alter();
        
        table.decimal("platform_comission", 16, 2).alter();
    
        table.decimal("transaction_subtotal", 16, 2).alter();

        table.decimal("transaction_discount_rate", 16, 2).alter(); 
        table.decimal("transaction_discount_amount", 16, 2).alter();
        table.decimal("transaction_tax_rate", 16, 2).alter();
        table.decimal("transaction_tax_amount", 16, 2).alter();
        table.decimal("transaction_coupon_rate", 16, 2).alter();
        table.decimal("transaction_coupon_amount", 16, 2).alter();
        table.decimal("transaction_wallet_amount", 16, 2).alter();
        
        table.decimal('refund_total', 16, 2).alter();
    });
};

exports.down = function(knex) {
    return knex.schema.alterTable('reports', function(table) {
    });
};
