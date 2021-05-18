import ModelError from "../Errors/ModelError.js";
import Cast from "../Traits/Cast.js";
import BaseModel from "./BaseModel.js";

class M_groupusers extends BaseModel {

     Id = null;
     GroupName = null;;
     Description = null;
     Created = null;
     CreatedBy = null;
     Modified = null;
     ModifiedBy = null;

     constructor() {
          super("m_groupusers", "Id");
          this.addTrait(Cast);
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
                    GroupName: 'required|min:10|email'
               },
               errors: {
                    required: ":attribute Harus Isi",
                    min: {
                         string: ":attribute Harus lebih dari 10 karakter"
                    },
                    email: ":attribute Bukan email"
               },
               attributName: {
                    GroupName: "Nama Grup"
               }
          };

          return rulesAndError;
     }

     // _change_GroupName(){
     //      this.GroupName = "Changed";
     // }

}


export default M_groupusers;