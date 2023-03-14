exports.up = function(knex) {
    return knex.schema.createTable('files', function(table) {
        table.increments();
        table.string('path');
        table.string('driver');
        table.bigInteger('store_id').unsigned();
        table.bigInteger('customer_id').unsigned();
        table.tinyint('file_type').unsigned();
        table.datetime('created_at').defaultTo(knex.fn.now());
        table.datetime('updated_at').defaultTo(knex.fn.now());
        table.datetime('deleted_at');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('files');
};
