
exports.up = function(knex) {
    return knex.schema.alterTable('inventories', function(table) {
        table.tinyint('inventory_status');
        table.datetime('inventory_approved_at');
    });
};

exports.down = function(knex) {
    return knex.schema.alterTable('inventories', function(table) {
        table.dropColumn('inventory_status');
        table.dropColumn('inventory_approved_at');
    });
};
