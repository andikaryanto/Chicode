import CollectionError from "../Errors/CollectionError.js";
import Collection from "../Libraries/Collection.js";

class CollectionModel extends Collection {

     #_className = null;
     constructor(items) {
          super(items);
     }

     /**
      * 
      * @param {} item instance of object model
      * @returns 
      */
     add(item) {
          this.items.push(item);
          this;
     }

     /**
      * find data with primary key data
      * 
      * @param {} id 
      * @return {this}
      */
     find(id) {
          return this.filter(x => x[x.getPrimaryKey()] == id);
     }

     /**
      * 
      * @param {[]} ids 
      * @returns {this}
      */
     except(ids) {
          if (!Array.isArray(ids))
               throw new CollectionError("expect an array for ids")

          return this.filter(function (x) {
               let found = ids.find(id => id == x[x.getPrimaryKey()])
               return found == undefined;
          })
     }

     /**
      * 
      * @param {string} columnName 
      * @return {[]}
      */
     chunk(columnName) {
          let chunk = []
          this.items.forEach((item, i) => {
               if (columnName in item) {
                    chunk.push(item[columnName])
               }
          });
          return chunk;

     }

     /**
      * Get eloquent unsaved data means Id of eloquent is null
      * @return {this}
      */
     unSaved() {
          return this.filter(x => x[x.getPrimaryKey()] == null);
     }

     /**
      * Get eloquent unsaved data means Id of eloquent is not null
      * @return {this}
      */
     saved() {
          return this.filter(x => x[x.getPrimaryKey()] != null);
     }

     /**
      * Sum a colum of Collection item
      * @param {string} columnName 
      * @returns {number}
      */
     sum(columnName) {
          let total = 0;
          this.items.forEach((item, i) => {
               total += item[columnName];
          });
          return total;

     }

     /**
     * 
     * Average a colum of Collection item
     * @param {string} columnName 
     * @returns {number}
     */
     avg(columnName) {
          let total = 0;
          this.items.forEach((item, i) => {
               total += item[columnName];
          });
          return total / this.items.length;

     }

     /**
      * Find an object has minimum value of column
      * @param {string} columnName 
      * @returns {{}}
      */
     min(columnName) {
          let min = 0;
          let data = null;
          this.items.forEach((item, i) => {
               if (data == null) {
                    min = item[columnName];
                    data = item;
               } else {
                    if (min > item[columnName]) {
                         min = item[columnName];
                         data = item
                    }
               }
          });
          return data;

     }

     /**
      * 
      * Find an object has maximum value of column
      * @param {string} columnName 
      * @returns {{}}
      */
     max(columnName) {
          let min = 0;
          let data = null;
          this.items.forEach((item, i) => {
               if (data == null) {
                    min = item[columnName];
                    data = item;
               } else {
                    if (min < item[columnName]) {
                         min = item[columnName];
                         data = item
                    }
               }
          });
          return data;

     }

     [Symbol.iterator]() {
          return this.items.values();
     };

}

export default CollectionModel;