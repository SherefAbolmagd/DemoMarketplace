exports.up = function(knex) {
    return knex.schema.table('orders', function(table) {
        table.boolean('free_delivery');
    });
};

exports.down = function(knex) {
    return knex.schema.table('orders', function(table) {
        table.dropColumn('free_delivery');
    });
};