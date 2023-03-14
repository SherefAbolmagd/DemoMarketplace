
exports.up = function(knex) {
    return knex.schema.alterTable('inventories', function(table) {
        table.json("schedule_rule");
    });
};

exports.down = function(knex) {
    return knex.schema.alterTable('inventories', function(table) {
        table.dropColumn("schedule_rule");
    });
};
