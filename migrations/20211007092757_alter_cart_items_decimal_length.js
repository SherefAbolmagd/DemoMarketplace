
exports.up = function(knex) {
    return knex.schema.alterTable('cart_items', function(table) {
        table.string('image_id').alter();

        table.decimal("price", 16, 2).alter();

        table.decimal("comission_rate", 16, 2).alter();
        table.decimal("comission_amount", 16, 2).alter();

        table.decimal("discount_rate", 16, 2).alter();
        table.decimal("discount_amount", 16, 2).alter();

        table.decimal("coupon_rate", 16, 2).alter();
        table.decimal("coupon_amount", 16, 2).alter();
    });
};

exports.down = function(knex) {
    return knex.schema.alterTable('cart_items', function(table) {
        table.bigInteger('image_id').alter(); 
    });
};
