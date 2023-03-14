
exports.up = function(knex) {
    return knex.schema.createTable('vouchers', function(table) {
        table.increments();
        table.bigInteger('cart_id').unsigned();
        
        table.bigInteger('customer_id').unsigned();
        table.bigInteger('business_id').unsigned();

        table.bigInteger('store_id').unsigned();

        table.string("code");
        table.decimal("value");
        table.datetime('redeemed_at');
        
        table.datetime('created_at').defaultTo(knex.fn.now());
        table.datetime('updated_at').defaultTo(knex.fn.now());
        table.datetime('deleted_at');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('vouchers');
};
