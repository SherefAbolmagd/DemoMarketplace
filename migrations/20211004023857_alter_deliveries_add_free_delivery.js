exports.up = function(knex) {
    return knex.schema.table('deliveries', function(table) {
        table.boolean('free_delivery');
    });
};

exports.down = function(knex) {
    return knex.schema.table('deliveries', function(table) {
        table.dropColumn('free_delivery');
    });
};