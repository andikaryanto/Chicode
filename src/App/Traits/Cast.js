import Trait from "../../Core/Traits/Trait";

class Cast extends Trait {

     register(Model, options = {}) {
     //     for(const [key, value] of Object.entries(options)){
              Model.prototype.Is = true;
              
     //     }
     }


}

export default Cast;