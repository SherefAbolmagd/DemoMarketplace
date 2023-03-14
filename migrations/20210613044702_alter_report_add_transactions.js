
exports.up = function(knex) {
    return knex.schema.table('reports', function(table) {
        table.dropColumn("transaction_wallet");
        table.dropColumn("transaction_delivery");
        table.dropColumn("transaction_tax");
        table.dropColumn("transaction_discount");
        table.dropColumn("transaction_coupon");
        table.dropColumn("transaction_rounding");
        table.dropColumn("transaction_total");       
         
        table.decimal("transaction_discount_rate");        
        table.decimal("transaction_discount_amount");        
        table.decimal("transaction_tax_rate");        
        table.decimal("transaction_tax_amount");        
        table.decimal("transaction_coupon_rate");        
        table.decimal("transaction_coupon_amount");        
        table.decimal("transaction_wallet_amount");      
    });
};

exports.down = function(knex) {
    return knex.schema.table('reports', function(table) {
        table.decimal("transaction_wallet");
        table.decimal("transaction_delivery");
        table.decimal("transaction_tax");
        table.decimal("transaction_discount");
        table.decimal("transaction_coupon");
        table.decimal("transaction_rounding");
        table.decimal("transaction_total");

        table.dropColumn("transaction_discount_rate");        
        table.dropColumn("transaction_discount_amount");        
        table.dropColumn("transaction_tax_rate");        
        table.dropColumn("transaction_tax_amount");        
        table.dropColumn("transaction_coupon_rate");        
        table.dropColumn("transaction_coupon_amount");        
        table.dropColumn("transaction_wallet_amount");  
    });
};
