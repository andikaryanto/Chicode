import Routers from "../../Core/Config/Routers.js"
import UserApi from "../Controllers/Rest/UserApi.js";
import WireApi from "../Controllers/Rest/WireApi.js";
import ApiMiddleware from "../Middlewares/ApiMiddleware.js";

const Api = () => {
     let routers = new Routers();
     routers.group("/user", [], routers => {
          routers.post("/login", [], UserApi, "login");
     });

     routers.group("/wire", [], routers => {
          routers.post("/confirm", [ ApiMiddleware ], WireApi, "confirmRequest");
     });

     return routers.getRouter();
}

export default Api;