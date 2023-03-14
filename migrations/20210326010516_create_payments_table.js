exports.up = function(knex) {
    return knex.schema.createTable('payments', function(table) {
        table.increments();
        
        table.bigInteger('provider_id').unsigned();
        
        table.bigInteger('transaction_id').unsigned();
        
        table.string("ref_id");
        table.decimal("total");
        table.decimal("service_charge");
        table.string("error");
        
        table.datetime('created_at').defaultTo(knex.fn.now());
        table.datetime('updated_at').defaultTo(knex.fn.now());
        table.datetime('deleted_at');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('payments');
};
