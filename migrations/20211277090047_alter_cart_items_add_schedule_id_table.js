
exports.up = function(knex) {
    return knex.schema.alterTable('cart_items', function(table) {
        table.bigInteger("schedule_id");
    });
};

exports.down = function(knex) {
    return knex.schema.alterTable('cart_items', function(table) {
        table.dropColumn("schedule_id");
    });
};
