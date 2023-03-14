
exports.up = function(knex) {
    return knex.schema.renameTable("stocks","inventories");
};

exports.down = function(knex) {
    return knex.schema.renameTable("inventories","stocks");
};
