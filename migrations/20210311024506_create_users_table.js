
exports.up = function(knex) {
    return knex.schema.createTable('users', function(table) {
        table.increments();
        table.string('full_name');
        table.string('username').notNullable();
        table.string('email').notNullable();
        table.string('phone');
        table.string('password').notNullable();
        table.datetime('email_verified_at');
        table.datetime('phone_verified_at');
        table.datetime('created_at').defaultTo(knex.fn.now());
        table.datetime('updated_at').defaultTo(knex.fn.now());
        table.datetime('deleted_at');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
