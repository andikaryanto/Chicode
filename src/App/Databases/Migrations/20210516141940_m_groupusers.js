
exports.up = function(knex) {
     return knex.schema
     .createTable("m_groupusers", function(table){
          table.increments('Id').primary();
          table.string('GroupName', 100).nullable();
          table.string('Description', 300).nullable();
          table.datetime('Created', { precision: 6 }).nullable();
          table.string('CreatedBy', 100).nullable();
          table.datetime('Modified', { precision: 6 }).nullable();
          table.string('ModifiedBy', 100).nullable();
     });
};

exports.down = function(knex) {
  
};
