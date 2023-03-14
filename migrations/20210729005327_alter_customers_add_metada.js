exports.up = function(knex) {
    return knex.schema.table('customers', function(table) {
        table.json('metadata');
    });
};

exports.down = function(knex) {
    return knex.schema.table('customers', function(table) {
        table.dropColumn('metadata');
    });
};