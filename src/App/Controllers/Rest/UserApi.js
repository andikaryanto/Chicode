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

     async store({request}) {
          let body = request.body;
          let trx = await DbTrans.beginTransaction();
          try {
               let user = new M_users();
               user.parseFromRequest();
               user.setPassword(body.Password);
               await user.save(trx);
               trx.commit();
               return ResponseData.status(200).json(user);
          } catch(e){
               trx.rollback();
               result = {
                    Message: e.message,
                    Data: null,
                    Response: ResponseCode.FAILED_SAVE_DATA
               }
               return ResponseData.status(400).json(user);
          }
     }

     async update({request}) {
          let Id = request.params.Id;
          let trx = await DbTrans.beginTransaction();
          try {
               let user = await M_users.find(Id);
               user.Username = "andik";
               await user.save(trx);
               trx.commit();
               return ResponseData.status(200).json(user);
          } catch(e){
               trx.rollback();
               result = {
                    Message: e.message,
                    Data: null,
                    Response: ResponseCode.FAILED_SAVE_DATA
               }
               return ResponseData.status(400).json(user);
          }
     }

     async list({request}) {
          try {
               let users = await M_users.findAll();
               return ResponseData.status(200).json(users);
          } catch(e){
               result = {
                    Message: e.message,
                    Data: null,
                    Response: ResponseCode.FAILED_SAVE_DATA
               }
               return ResponseData.status(400).json(user);
          }
     }
}

export default UserApi;