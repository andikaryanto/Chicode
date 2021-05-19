import ModelError from "../Errors/ModelError.js";
import CommonLib from "../Libraries/CommonLib.js";
import Cast from "../Traits/Cast.js";
import BaseModel from "./BaseModel.js";
import M_groupusers from "./M_groupusers.js";

class M_users extends BaseModel {

     Id = null;
     M_Groupuser_Id = null;
     Username = null;
     Password = null;
     Photo = null;
     IsLoggedIn = null;
     IsActive = null;
     CreatedBy = null;
     Modified = null;
     ModifiedBy = null;

     static #_cast = {
          IsLoggedIn : "boolean",
          IsActive : "boolean" 
     }

     constructor(){
          super("m_users", "Id", M_users.#_cast);
          this.IsActive = 1;
          this.IsLoggedIn = 0;

     }

     validate() {
          let vRules = this.validationRules();
          let validation = this.validateRules(vRules.rules, vRules.errors);
          validation.setAttributeNames(vRules.attributName);
          if (validation.fails()) {
               for (const [key, value] of Object.entries(validation.errors.errors)) {
                    throw new ModelError(value[0]);
               }
          }
          return this;
     }

     validationRules() {
          let rulesAndError = {
               rules: {
                    Username: 'required',
                    Password: 'required',
                    M_Groupuser_Id: 'required',
               },
               errors: {
                    required: ":attribute Harus Isi",
               },
               attributName: {
                    Username: "Nama Pengguna",
                    Password: "Password",
                    M_Groupuser_Id: "Role"
               }
          };

          return rulesAndError;
     }

     setPassword(password){
          
          if(this.Username == null)
               throw new ModelError("Username belum di set", this);

          this.Password = CommonLib.encryptMd5(CommonLib.getKey() + this.Username + password)
     }

     async M_Groupuser() {
          var groupuser = await M_groupusers.find(this.M_Groupuser_Id)
          return groupuser;
     }    

}

export default M_users;