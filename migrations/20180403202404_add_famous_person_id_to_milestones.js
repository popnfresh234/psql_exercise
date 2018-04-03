
exports.up = function(knex, Promise) {
    return Promise.all([
    knex.schema.alterTable('milestones', function(table){
      table.integer('famous_person_id').references('id').inTable('famous_people').notNull();
    })
  ]);
};

exports.down = function(knex, Promise) {

};
