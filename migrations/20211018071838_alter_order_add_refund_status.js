
exports.up = function(knex) {
    return knex.schema.table('orders', function(table) {
        table.tinyint("refund_status").unsigned();
    })
};

exports.down = function(knex) {
    return knex.schema.table('orders', function(table) {
        table.dropColumn("refund_status");
    })
};
