class View {
     static #_instance = null;
     view = "";
     data = {};
     type = "view";

     constructor(){

     }

     /**
      * 
      * @returns {View}
      */
     static getInstance(){
          if(this.#_instance == null);
               this.#_instance = new this;
          return this.#_instance;
     }

     /**
      * Render View path
      * @param {string} view 
      * @param {{}} data 
      * @returns 
      */
     static make(view, data) {
          let instance = View.getInstance();
          instance.view = view;
          instance.data = data;
          instance.type = "view";
          return instance;
     }

     
     /**
      * Render View path
      * @param {string} view 
      * @param {{}} data 
      * @returns 
      */
     static html(view, data) {
          let instance = View.getInstance();
          instance.view = view;
          instance.data = data;
          instance.type = "html";
          return instance;
     }

     /**
      * Send data
      * @param {{}} data 
      * @returns 
      */
     data(data){
          this.data = data;
          return this;
     }

}

export default View;