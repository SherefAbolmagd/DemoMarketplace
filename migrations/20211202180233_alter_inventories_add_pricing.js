
exports.up = function(knex) {
    return knex.schema.table('inventories', function(table) {
        table.dropColumn("quantity");
        table.dropColumn("type");
        table.dropColumn("cart_id");

        table.bigInteger('product_id');

        table.string('product_name');
        table.string('variant_name');
        table.string('store_name');
        
        table.string('image_path');

        table.decimal("price",null);
        table.decimal("display_price",null);

        table.boolean("has_stock");
        table.decimal('stock', null);

        table.boolean("has_minimum_order_quantity");
        table.decimal("minimum_order_quantity",null);

        table.boolean("has_bulk_pricing");
        table.json("bulk_pricing");
    })
};

exports.down = function(knex) {
    return knex.schema.table('inventories', function(table) {
        table.bigInteger("cart_id");
        table.tinyint('type');
        table.decimal('quantity', null);

        table.dropColumn('product_id');

        table.dropColumn('product_name');
        table.dropColumn('variant_name');
        table.dropColumn('store_name');
        
        table.dropColumn('image_path');
        
        table.dropColumn("price");
        table.dropColumn("display_price");

        table.dropColumn('has_stock');
        table.dropColumn('stock');

        table.dropColumn("has_minimum_order_quantity");
        table.dropColumn("minimum_order_quantity");

        table.dropColumn("has_bulk_pricing");
        table.dropColumn("bulk_pricing");
    })
};
