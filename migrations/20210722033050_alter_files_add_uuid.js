exports.up = function(knex) {
    return knex.schema.table('files', function(table) {
        table.string('uuid');
    });
};

exports.down = function(knex) {
    return knex.schema.table('files', function(table) {
        table.dropColumn('uuid');
    });
};