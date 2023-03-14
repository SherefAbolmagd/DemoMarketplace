exports.up = function(knex) {
    return knex.schema.table('customers', function(table) {
        table.datetime('buyer_approved_at');
    });
};

exports.down = function(knex) {
    return knex.schema.table('customers', function(table) {
        table.dropColumn('buyer_approved_at');
    });
};