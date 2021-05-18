// Do not remove this file. it's default

exports.up = function(knex) {
     return knex.schema
     .createTable("seeds", function(table){
          table.increments('id').primary();
          table.string('name', 100).nullable();
          table.datetime('time', 6).nullable();
     });
};

exports.down = function(knex) {
  
};
