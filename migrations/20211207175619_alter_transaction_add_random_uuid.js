
exports.up = function(knex) {
    return knex.schema.alterTable('transactions', function(table) {
        table.uuid("random_uuid");
    });
};

exports.down = function(knex) {
    return knex.schema.alterTable('transactions', function(table) {
        table.dropColumn("random_uuid");
    });
};
