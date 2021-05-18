import Model from "../../Core/Model/Model.js";

class BaseModel extends Model {
     constructor(table, primaryKey, cast){
          super(table, primaryKey, cast)
     }

}

export default BaseModel;