
exports.up = function(knex) {
    return knex.schema.createTable('stores', function(table) {
        table.increments();
        table.string('store_name');
        table.string('company_name');
        table.string('company_registration');
        table.tinyint('store_type');
        table.string('support_email');
        table.string('support_phone');
        table.string('bank_account_name');
        table.string('bank_account_no');
        table.tinyint('bank_id');
        table.datetime('store_approved_at');
        table.jsonb('metadata');
        table.datetime('created_at').defaultTo(knex.fn.now());
        table.datetime('updated_at').defaultTo(knex.fn.now());
        table.datetime('deleted_at');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('stores');
};