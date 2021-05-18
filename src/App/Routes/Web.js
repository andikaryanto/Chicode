import Routers from "../../Core/Config/Routers.js"
import LoginController from "../Controllers/Office/LoginController.js";
import MgroupuserController from "../Controllers/Office/MgroupuserController.js";
import MuserController from "../Controllers/Office/MuserController.js";
import OfficeMiddleware from "../Middlewares/OfficeMiddleware.js";

const Web = () => {
     let routers = new Routers();

     routers.get("/",[], LoginController,"index");

     routers.get("/office", [], LoginController, "index");
     routers.get("/office/login", [], LoginController, "index");
     routers.post("/office/dologin", [], LoginController, "doLogin");
     routers.get("/office/dologout", [], LoginController, "doLogout");

     routers.group("/office",[ OfficeMiddleware ], routers => {
          routers.group("/mgroupuser", [], routers => {
               routers.get("", [], MgroupuserController, "index");
               routers.post("/getalldata", [], MgroupuserController, "getAllData");
               routers.get("/add", [], MgroupuserController, "add");
               routers.post("/store", [], MgroupuserController, "store");
               routers.get("/:id/edit", [], MgroupuserController, "edit");
               routers.post("/update", [], MgroupuserController, "update");
               routers.post("/delete", [], MgroupuserController, "destroy");
          });

          routers.group("/muser", [], routers => {
               routers.get("", [], MuserController, "index");
               routers.post("/getalldata", [], MuserController, "getAllData");
               routers.get("/add", [], MuserController, "add");
               routers.post("/store", [], MuserController, "store");
               routers.get("/:id/edit", [], MuserController, "edit");
               routers.post("/update", [], MuserController, "update");
               routers.post("/delete", [], MuserController, "destroy");
          });
     });
     
     routers.group("/customer",[], function(routers){
          routers.get("", [], MuserController, "index");
     })
     return routers.getRouter();
}

export default Web;