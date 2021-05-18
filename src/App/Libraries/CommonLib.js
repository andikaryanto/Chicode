import md5 from "md5";
import dotenv from 'dotenv';

dotenv.config();

class CommonLib {

     /**
      * 
      * @param {string} value 
      */
     static encryptMd5(value){     
          let hash = md5(value);
          let lastString = hash.substr(hash.length - 5, 5);
          let reversed = lastString.split("").reverse().join("");
          let newstring = hash.substr(0, hash.length - 5) + reversed;
          return newstring;
     }

     static isNull(value){
          return value == null;
     }

     static isUndefined(value){
          return value == undefined;
     }

     static getKey(){
          return process.env.APP_KEY;
     }

     static defaultUser()
	{
		return 'skywalker';
	}
}

export default CommonLib;