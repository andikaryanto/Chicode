
exports.up = function(knex) {
     return knex.schema
     .createTable("m_users", function(table){
          table.increments('Id').primary();
          table.integer('M_Groupuser_Id', 10).unsigned().nullable();
          table.string('Username', 100).nullable();
          table.string('Password', 50).nullable();
          table.string('Photo', 300).nullable();
          table.boolean('IsLoggedIn').nullable();
          table.boolean('IsActive').nullable();
          table.datetime('Created', { precision: 6 }).nullable();
          table.string('CreatedBy', 100).nullable();
          table.datetime('Modified', { precision: 6 }).nullable();
          table.string('ModifiedBy', 100).nullable();
          table.foreign("M_Groupuser_Id").references("Id").inTable('m_groupusers').onDelete("RESTRICT").onUpdate("CASCADE");
     });
};

exports.down = function(knex) {
  
};
