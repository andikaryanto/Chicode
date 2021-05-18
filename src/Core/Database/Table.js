import DbConnection from "./Connection/DbConnection";
import fs from 'fs';
import StringLib from "../Libraries/StringLib";
import approot from 'app-root-path';
class Table {

     /**
      * get table colum info
      * @param {string} tableName 
      */
     static async columnInfo(tableName) {
          return await DbConnection.table(tableName).columnInfo();
     }

     static async makeModel(tableName) {
          let modelName = StringLib.ucFirst(tableName);
          let actualColumns = await Table.columnInfo(tableName);
          let columns = Object.keys(actualColumns);
          let props = "";
          columns.forEach((e, i) => {
               props += `\n\t${e} = null;`;
          });

          let content = function () {
               return `import Model from "../../Core/Model/Model.js";
               \nclass ${modelName} extends Model {
                    ${props}
                    \n\tconstructor() { \n\t\tsuper("${tableName}", "Id");\n\t}
               \n}
               \nexport default ${modelName};`
          };

          let fileName = `${approot}/src/App/Models/${modelName}.js`;
          fs.open(fileName, 'r', function (err, fd) {
               if (err) {
                    fs.writeFile(fileName, content(), function (err) {
                         if (err) throw err;
                         console.log('Saved!');
                    });
               } else {
                    throw new Error("File is already exist !");
               }
          });
     }

}

export default Table;