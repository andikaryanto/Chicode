import Controller from "../../Core/Controller/Controller";

class BaseController extends Controller{

     globalData = {
          title : 'this is parent data'
     };

     constructor(){
          super();
     }

     
}
export default BaseController;     