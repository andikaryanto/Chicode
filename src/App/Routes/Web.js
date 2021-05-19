import Routers from "../../Core/Config/Routers.js"
import LoginController from "../Controllers/Office/LoginController.js";
import MgroupuserController from "../Controllers/Office/MgroupuserController.js";
import McolorController from "../Controllers/Office/McolorController.js";
import MwiretypeController from "../Controllers/Office/MwiretypeController.js";
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

          routers.group("/mcolor", [], routers => {
               routers.get("", [], McolorController, "index");
               routers.post("/getalldata", [], McolorController, "getAllData");
               routers.get("/add", [], McolorController, "add");
               routers.post("/store", [], McolorController, "store");
               routers.get("/:id/edit", [], McolorController, "edit");
               routers.post("/update", [], McolorController, "update");
               routers.post("/delete", [], McolorController, "destroy");
          });

          routers.group("/mwiretype", [], routers => {
               routers.get("", [], MwiretypeController, "index");
               routers.post("/getalldata", [], MwiretypeController, "getAllData");
               routers.get("/add", [], MwiretypeController, "add");
               routers.post("/store", [], MwiretypeController, "store");
               routers.get("/:id/edit", [], MwiretypeController, "edit");
               routers.post("/update", [], MwiretypeController, "update");
               routers.post("/delete", [], MwiretypeController, "destroy");
          });
     });
     
     routers.group("/customer",[], function(routers){
          routers.get("", [], MuserController, "index");
     })
     return routers.getRouter();
}

export default Web;