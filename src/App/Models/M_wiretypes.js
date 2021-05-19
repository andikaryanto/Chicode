import ModelError from "../Errors/ModelError.js";
import BaseModel from "./BaseModel.js";

class M_wiretypes extends BaseModel {

     Id = null;
     Name = null;
     Description = null;
     Created = null;
     CreatedBy = null;
     Modified = null;
     ModifiedBy = null;

     constructor() {
          super("m_wiretypes", "Id");
     }

     async validate() {
         
          const params = {
               where : {
                    Name : this.Name
               }
          }
          let existed = await M_wiretypes.findOne(params);
          if(existed != null){
               throw new ModelError("Data Suda Ada");
          }

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
                    Name: 'required'
               },
               errors: {
                    required: ":attribute Harus Isi",
                    min: {
                         string: ":attribute Harus lebih dari 10 karakter"
                    },
                    email: ":attribute Bukan email"
               },
               attributName: {
                    Name: "Nama"
               }
          };

          return rulesAndError;
     }

     // _change_GroupName(){
     //      this.GroupName = "Changed";
     // }

}


export default M_wiretypes;