
exports.up = function(knex) {
    return knex.schema.createTable('cart_items', function(table) {
        table.increments();
        table.bigInteger('customer_id').unsigned();
        table.bigInteger('business_id').unsigned();

        table.bigInteger('store_id').unsigned();

        table.bigInteger('order_id').unsigned();

        table.bigInteger('variant_id').unsigned();
        table.bigInteger('coupon_id').unsigned();

        table.string("name");
        table.float("quantity");
        table.decimal("price");

        table.decimal("comission_rate");
        table.decimal("comission_amount");

        table.decimal("discount_rate");
        table.decimal("discount_amount");

        table.decimal("coupon_rate");
        table.decimal("coupon_amount");

        table.string("comment");

        table.bigInteger('image_id').unsigned();

        table.string('product_name');
        table.tinyint('product_type').unsigned();

        table.tinyint('cart_status').unsigned();

        table.datetime('created_at').defaultTo(knex.fn.now());
        table.datetime('updated_at').defaultTo(knex.fn.now());
        table.datetime('deleted_at');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('cart_items');
};
