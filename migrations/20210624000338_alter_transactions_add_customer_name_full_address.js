
exports.up = function(knex) {
    return knex.schema.table('transactions', function(table) {
        table.string("customer_name");
        table.text("full_address");
    })
};

exports.down = function(knex) {
    return knex.schema.table('transactions', function(table) {
        table.dropColumn("customer_name");
        table.dropColumn("full_address");
    })
};
