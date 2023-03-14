
exports.up = function(knex) {
    return knex.schema.alterTable('payments', function(table) {
        table.decimal("total", 16, 2).alter();
        table.decimal("service_charge", 16, 2).alter();
    });
};

exports.down = function(knex) {
    return knex.schema.alterTable('payments', function(table) {
    });
};
