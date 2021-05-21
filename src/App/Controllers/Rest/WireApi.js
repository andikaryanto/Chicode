
import Controller from "../../../Core/Controller/Controller.js";
import ResponseData from "../../../Core/Controller/ResponseData.js";
import DbConnection from "../../../Core/Database/Connection/DbConnection.js";
import DbTrans from "../../../Core/Database/DbTrans.js";
import UserProc from "../../BusinessProcess/UserProc.js";
import ResponseCode from "../../Constants/ResponseCode.js";
import WireStatus from "../../Enum/WireStatus.js";
import ModelError from "../../Errors/ModelError.js";
import M_wires from "../../Models/M_wires.js";

class WireApi extends Controller {

     async confirmRequest({ request }) {
          let trx = await DbTrans.beginTransaction();
          let body = request.body;
          let headers = request.headers;
          let token = headers.authorization;
          try {
               let user = UserProc.decode(token);
               if(user.M_Groupuser_Id != 3) // 3 = verifikator, 
                    throw new ModelError("Akses Tidak Diberikan");
                    
               const params = {
                    where: {

                         Status: WireStatus.REQUESTED
                    },
                    order: {
                         Created: "DESC",
                    }
               };
               let wire = await M_wires.findOne(params);
               let IsActive = 0;
               let Status = null;
               if (wire != null) {
                    if (body.Status < 2 || body.Status > 3) 
                         throw new ModelError("Status Hanya Terima Atau Tolak");

                    if (body.Status == 2) {
                         IsActive = 1;
                         Status = WireStatus.APPROVED;
                         const paramsActive = {
                              where: {
                                   IsActive: 1
                              }
                         }


                         let activewire = await M_wires.findOne(paramsActive);
                         if (activewire != null) {
                              activewire.IsActive = 0;
                              if (! await activewire.save(trx))
                                   throw new ModelError("Gagal konfirmasi");
                         }
                    }

                    if (body.Status == 3) {
                         Status = WireStatus.REJECTED;
                    }

                    wire.Status = Status;
                    wire.IsActive = IsActive;
                    if (! await wire.save(trx))
                         throw new ModelError("Gagal konfirmasi");
                    
               }

               trx.commit();
               let result = {
                    Message: "Berhasil Konfirmasi",
                    Data: wire,
                    Response: ResponseCode.OK
               }
               return ResponseData.status(200).json(result);
          } catch (e) {
               trx.rollback();
               let result = {
                    Message: e.message,
                    Data: null,
                    Response: ResponseCode.FAILED_SAVE_DATA
               }
               return ResponseData.status(200).json(result);
          }
     }
}

export default WireApi;