exports.up = function(knex) {
    return knex.schema.table('reports', function(table) {
        table.string('company_name');
        table.string('company_registration');
        table.string('bank_name');
        table.string('bank_account_name');
        table.string('bank_account_no');
    });
};

exports.down = function(knex) {
    return knex.schema.table('reports', function(table) {
        table.dropColumn('company_name');
        table.dropColumn('company_registration');
        table.dropColumn('bank_name');
        table.dropColumn('bank_account_name');
        table.dropColumn('bank_account_no');
    });
};
