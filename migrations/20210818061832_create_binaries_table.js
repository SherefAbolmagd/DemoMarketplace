
exports.up = function(knex) {
    return knex.schema.createTable('binaries', function(table) {
        table.increments();
        table.string('uuid');
        table.string('filename');
        table.binary('data');
        table.bigInteger('store_id').unsigned();
        table.bigInteger('customer_id').unsigned();
        table.tinyint('file_type').unsigned();
        table.datetime('created_at').defaultTo(knex.fn.now());
        table.datetime('updated_at').defaultTo(knex.fn.now());
        table.datetime('deleted_at');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('binaries');
};
