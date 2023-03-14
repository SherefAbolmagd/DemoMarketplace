
exports.up = function(knex) {
    return knex.schema.createTable('schedules', function(table) {
        table.increments();

        table.bigInteger('inventory_id').unsigned();
        table.datetime('start_at');
        table.datetime('end_at');
        
        table.datetime('created_at').defaultTo(knex.fn.now());
        table.datetime('updated_at').defaultTo(knex.fn.now());
        table.datetime('deleted_at');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('schedules');
};
