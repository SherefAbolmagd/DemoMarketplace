exports.up = function(knex) {
    return knex.schema.table('addresses', function(table) {
        table.string('label');
        table.string('name');
        table.string('phone');
        table.string('email');
    });
};

exports.down = function(knex) {
    return knex.schema.table('addresses', function(table) {
        table.dropColumn('label');
        table.dropColumn('name');
        table.dropColumn('phone');
        table.dropColumn('email');
    });
};