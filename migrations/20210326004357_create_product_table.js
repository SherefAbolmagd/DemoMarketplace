
exports.up = function(knex) {
    return knex.schema.createTable('products', function(table) {
        table.increments();
        
        table.string('uuid');

        table.bigInteger('store_id').unsigned();
        table.datetime('product_approved_at');
        
        table.tinyint('product_status').unsigned();
        table.tinyint('store_type').unsigned();
        
        table.jsonb('data');
        
        table.datetime('created_at').defaultTo(knex.fn.now());
        table.datetime('updated_at').defaultTo(knex.fn.now());
        table.datetime('deleted_at');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('products');
};
