
exports.up = function(knex) {
    return knex.schema.table('reports', function(table) {
        table.decimal('refund_total');
    });
};

exports.down = function(knex) {
    return knex.schema.table('reports', function(table) {
        table.dropColumn('refund_total');
    });
};
