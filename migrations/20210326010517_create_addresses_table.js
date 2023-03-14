exports.up = function(knex) {
    return knex.schema.createTable('addresses', function(table) {
        table.increments();
        table.boolean("default");
        table.string('address_1');
        table.string('address_2');
        table.string('country');
        table.string('state');
        table.string('city');
        table.string("full_address");
        table.string("postcode");
        table.jsonb('metadata');
        table.decimal("latitude",10,7);
        table.decimal("longitude",10,7);
        table.bigInteger('customer_id').unsigned();
        table.bigInteger('store_id').unsigned();
        table.datetime('created_at').defaultTo(knex.fn.now());
        table.datetime('updated_at').defaultTo(knex.fn.now());
        table.datetime('deleted_at');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('addresses');
};
