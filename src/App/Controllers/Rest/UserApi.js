import UserProc from "../../BusinessProcess/UserProc.js";
import ResponseCode from "../../Constants/ResponseCode.js";
import ModelError from "../../Errors/ModelError.js";
import jwt from "jsonwebtoken";
import CommonLib from "../../Libraries/CommonLib.js";
import Db from "../../../Core/Database/Connection/DbConnection.js";
import M_users from "../../Models/M_users.js";
import DbTrans from "../../../Core/Database/DbTrans.js";
import Controller from "../../../Core/Controller/Controller.js";
import ResponseData from "../../../Core/Controller/ResponseData.js";

class UserApi extends Controller{

     async login({request}) {
          try {
               let body = request.body;
               let user = await UserProc.login(body.Username, body.Password);
               
               if(CommonLib.isNull(user))
                    throw new ModelError("Data pengguna tidak valid");

               let token = jwt.sign(user.toJson(), CommonLib.getKey());

               let result = {
                    Message: "Login Berhasil",
                    Token: token,
                    Response: ResponseCode.OK
               }
               
               return ResponseData.status(200).json(result);

          } catch (e) {
               var result = {};
               if (e instanceof Error) {
                    result = {
                         Message: e.message,
                         Data: null,
                         Response: ResponseCode.INVALID_LOGIN
                    }
               }
               if (e instanceof ModelError) {
                    result = {
                         Message: e.message,
                         Data: null,
                         Response: ResponseCode.INVALID_LOGIN
                    }
               }
               return ResponseData.status(400).json(result);
          }
     }

}

export default UserApi;