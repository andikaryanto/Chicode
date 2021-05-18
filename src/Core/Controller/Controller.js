import StringLib from "../Libraries/StringLib.js";
import approot from 'app-root-path';
import fs from 'fs';

class Controller {

     constructor(){
          
     }

     static makeController(path, controllerName){

          controllerName = StringLib.ucFirst(controllerName);
          let content = function () {
               return `import Controller from "../../Core/Controller/Controller";
               \nclass ${controllerName} extends Controller {
                    \n\tconstructor() { \n\t\tsuper();\n\t}
                    \n\tasync index({request, session, params}) {\n\t}
               \n}
               \nexport default ${controllerName};`
          };

          let fileName = `${approot}/src/App/Controllers/${path}/${controllerName}.js`;
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

export default Controller;