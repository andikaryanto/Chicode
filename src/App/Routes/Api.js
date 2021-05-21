import Routers from "../../Core/Config/Routers.js"
import GroupuserApi from "../Controllers/Rest/GroupuserApi.js";
import UserApi from "../Controllers/Rest/UserApi.js";
import WireApi from "../Controllers/Rest/WireApi.js";

const Api = () => {
     let routers = new Routers();
     routers.group("/user", [], routers => {
          routers.post("/login", [], UserApi, "login");
          routers.post("/save", [], UserApi, "store");
          routers.put("/update/:Id", [], UserApi, "update");
          routers.get("/list", [], UserApi, "list");
     });

     routers.group("/groupuser", [], routers => {
          routers.get("/list", [], GroupuserApi, "getList").named("groupuser.list");
     });

     routers.group("/wire", [], routers => {
          routers.post("/confirm", [], WireApi, "confirmRequest");
     });

     return routers.getRouter();
}

export default Api;