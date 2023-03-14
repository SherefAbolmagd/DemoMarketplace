
exports.up = function(knex) {
    return knex.schema.createTable('coupons', function(table) {
        table.increments();
        table.string('name');
        table.tinyint('coupon_type').unsigned();
        table.bigInteger('store_id').unsigned();
        table.decimal("discount_rate", null);
        table.decimal("discount_amount", null);
        table.boolean("enable");
        table.bigInteger('limit');
        table.bigInteger('count').unsigned();
        table.datetime('expired_at');
        table.decimal("min_amount", null);
        table.tinyint('charge_type').unsigned();
        
        table.datetime('created_at').defaultTo(knex.fn.now());
        table.datetime('updated_at').defaultTo(knex.fn.now());
        table.datetime('deleted_at');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('coupons');
};
