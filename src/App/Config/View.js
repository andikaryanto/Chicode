import { Express } from 'express';
import appRoot from 'app-root-path';
class View {
     /**
      * 
      * @param {Express} app 
      */
     static set(app) {

          app.set('view engine', 'pug');
          app.set('views', appRoot + '/src/App/Views');
     }

     /**
      * Register functions and variables to be used in view
      * @returns {{}}
      */
     static hook() {

          // current reserved variables are : 
          // * csrfToken
          // * lang

          return {

               //... 


          }
     }
}
export default View;