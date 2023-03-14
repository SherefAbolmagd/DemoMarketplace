
exports.up = function(knex) {
    return knex.schema.alterTable('payments', function(table) {
        table.decimal("total", null).alter();
        table.decimal("service_charge", null).alter();
    });
};

exports.down = function(knex) {
    return knex.schema.alterTable('payments', function(table) {
    });
};
