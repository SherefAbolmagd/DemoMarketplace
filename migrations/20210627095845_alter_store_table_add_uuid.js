exports.up = function(knex) {
    return knex.schema.table('stores', function(table) {
        table.string('uuid');
    });
};

exports.down = function(knex) {
    return knex.schema.table('stores', function(table) {
        table.dropColumn('uuid');
    });
};
