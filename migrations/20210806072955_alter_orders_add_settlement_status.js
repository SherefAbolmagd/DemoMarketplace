
exports.up = function(knex) {
    return knex.schema.table('orders', function(table) {
        table.tinyint("settlement_status").unsigned();
    })
};

exports.down = function(knex) {
    return knex.schema.table('orders', function(table) {
        table.dropColumn("settlement_status");
    })
};
