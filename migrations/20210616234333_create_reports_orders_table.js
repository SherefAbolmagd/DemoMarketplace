
exports.up = function(knex) {
    return knex.schema.createTable('reports_orders', function(table) {
        table.increments();

        table.bigInteger('report_id').unsigned();
        table.bigInteger('order_id').unsigned();

        table.datetime('created_at').defaultTo(knex.fn.now());
        table.datetime('updated_at').defaultTo(knex.fn.now());
        table.datetime('deleted_at');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('reports_orders');
};
