exports.up = function(knex) {
    return knex.schema.createTable('merchants', function(table) {
        table.increments();
        table.bigInteger('user_id').unsigned();
        table.bigInteger('store_id').unsigned();
        table.tinyint('merchant_role').unsigned();
        table.datetime('created_at').defaultTo(knex.fn.now());
        table.datetime('updated_at').defaultTo(knex.fn.now());
        table.datetime('deleted_at');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('merchants');
};
