
exports.up = function(knex) {
    return knex.schema.createTable('product_variants', function(table) {
        table.increments();
        
        table.bigInteger('store_id').unsigned();
        table.bigInteger('product_id').unsigned();
        
        table.jsonb('data');
        
        table.datetime('created_at').defaultTo(knex.fn.now());
        table.datetime('updated_at').defaultTo(knex.fn.now());
        table.datetime('deleted_at');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('product_variants');
};
