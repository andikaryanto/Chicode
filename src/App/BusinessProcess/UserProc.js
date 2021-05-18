import CommonLib from "../Libraries/CommonLib.js";
import M_users from "../Models/M_users.js";

class UserProc {

     /**
      * 
      * @param {string} username 
      * @param {string} password 
      * @returns 
      */
     static async login(username, password) {

          const userpassword = CommonLib.encryptMd5(CommonLib.getKey() + username + password);
          const filter = {
               where : {
                    Password : userpassword
               }
          };
     
          let muser = await M_users.findOne(filter);
          return muser;
     }
}
export default UserProc;