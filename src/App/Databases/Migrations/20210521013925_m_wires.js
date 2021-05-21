
exports.up = function(knex) {
     return knex.schema
     .createTable("m_wires", function(table){
          table.increments('Id').primary();
          table.integer('M_Color_Id', 10).unsigned().nullable();
          table.integer('M_Wiretype_Id', 10).unsigned().nullable();
          table.string('Name', 100).nullable();
          table.integer('Length', 11).nullable();
          table.integer('Bending', 11).nullable();
          table.integer('Loss', 11).nullable();
          table.integer('Status', 11).nullable();
          table.tinyint('IsActive', 1).nullable();
          table.datetime('Created', { precision: 6 }).nullable();
          table.string('CreatedBy', 100).nullable();
          table.datetime('Modified', { precision: 6 }).nullable();
          table.string('ModifiedBy', 100).nullable();
          table.foreign("M_Color_Id").references("Id").inTable('m_colors').onDelete("RESTRICT").onUpdate("CASCADE");
          table.foreign("M_Wiretype_Id").references("Id").inTable('m_wiretypes').onDelete("RESTRICT").onUpdate("CASCADE");
     });
};

exports.down = function(knex) {
  
};
