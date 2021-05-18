class ResponseData {
     static #_instance = null;
     code = 200;
     data = {};

     constructor(){

     }

     /**
      * 
      * @returns {ResponseData}
      */
     static getInstance(){
          if(this.#_instance == null);
               this.#_instance = new this;
          return this.#_instance;
     }

     static status(code) {
          let instance = ResponseData.getInstance();
          instance.code = code;
          return instance;
     }

     json(data){
          this.data = data;
          return this;
     }

}

export default ResponseData;