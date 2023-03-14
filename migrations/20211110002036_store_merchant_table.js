
exports.up = async function(knex) {
    await knex.schema.createTable('stores_merchants', function(table) {
        table.increments();

        table.bigInteger('store_id').unsigned();
        table.bigInteger('merchant_id').unsigned();

        table.datetime('created_at').defaultTo(knex.fn.now());
        table.datetime('updated_at').defaultTo(knex.fn.now());
        table.datetime('deleted_at');
    })

    // migrate data for relation
    let relation = await knex.whereNotNull("store_id").select("id","store_id").from("merchants");
    relation = relation.map(({id, store_id})=>({merchant_id:id, store_id}));

    if(relation.length > 0)
        await knex("stores_merchants").insert(relation);
};

exports.down = function(knex) {
    return knex.schema.dropTable('stores_merchants');
};
