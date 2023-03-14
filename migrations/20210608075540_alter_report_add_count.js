
exports.up = function(knex) {
    return knex.schema.table('reports', function(table) {
        table.integer("store_total_order");
        table.integer("store_total_product");
    })
};

exports.down = function(knex) {
    return knex.schema.table('reports', function(table) {
        table.dropColumn("store_total_order");
        table.dropColumn("store_total_product");
    })
};
