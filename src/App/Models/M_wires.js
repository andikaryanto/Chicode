import ModelError from "../Errors/ModelError.js";
import BaseModel from "./BaseModel.js";

class M_wires extends BaseModel {

     Id = null;
     M_Color_Id = null;
     M_Wiretype_Id = null;
     Name = null;
     Length = null;
     Bending = null;
     Loss = null;
     Status = null;
     IsActive = null;
     Created = null;
     CreatedBy = null;
     Modified = null;
     ModifiedBy = null;

     constructor() {
          super("m_wires", "Id");
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
                    M_Color_Id: 'required',
                    M_Wiretype_Id: 'required',
                    Name: 'required',
                    Length: 'required',
                    Bending: 'required',
                    Loss: 'required'
               },
               errors: {
                    required: ":attribute Harus Isi",
                    min: {
                         string: ":attribute Harus lebih dari 10 karakter"
                    },
                    email: ":attribute Bukan email"
               },
               attributName: {
                    M_Color_Id: "Warna",
                    M_Wiretype_Id: "Jenis",
                    Name: "Nama",
                    Length: "Panjang",
                    Bending: "Lekuk",
                    Loss: "Loss"
               }
          };

          return rulesAndError;
     }
}

export default M_wires;