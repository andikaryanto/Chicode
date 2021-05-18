import BaseModel from "./BaseModel";

class M_popups extends BaseModel{

     Id = null;
	Picture = null;
	Description = null;
	IsDeleted = null;
	CreatedBy = null;
	ModifiedBy = null;
	Created = null;
	Modified = null;

     constructor() {
          super("m_popups", "Id");
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
                    Picture: 'required|max:300'
               },
               errors: {
                    required: ":attribute Harus Isi",
                    max: {
                         string: ":attribute tidak boleh lebih daro 300 karakter"
                    }
               },
               attributName: {
                    Picture: "Gambar"
               }
          };

          return rulesAndError;
     }
}

export default M_popups;