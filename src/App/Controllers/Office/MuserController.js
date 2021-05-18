import ResponseData from "../../../Core/Controller/ResponseData.js";
import View from "../../../Core/Controller/View.js";
import ResponseCode from "../../Constants/ResponseCode.js";
import ModelError from "../../Errors/ModelError.js";
import M_users from "../../Models/M_users.js";

class MuserController {

     async index() {
          try {
               return View.make('office/m_user/index', { title: 'Pengguna' });
          } catch (e) {
               var result = {
                    Message: e.message,
                    Data: null,
                    Response: ResponseCode.DATA_NOT_FOUND
               }

               return ResponseData.status(400).json(result);
          }
     }


     async getAllData() {
          try {
               let filter = {
                    join: {
                         "m_groupusers": {
                              type: "Left",
                              key: [
                                   "m_users.M_Groupuser_Id",
                                   "m_groupusers.Id"
                              ]
                         }
                    },
                    whereNot: {
                         Username: "skywalker"
                    }
               }
               let datatables = M_users.datatables(filter);
               datatables.addDtRowClass('rowdetail').
                    addDtRowId('m_users.Id').
                    addColumn(
                         'm_users.Id',
                         null,
                         null,
                         false,
                         false
                    ).
                    addColumn(
                         '',
                         null,
                         function (row, i) {
                              return i + 1;
                         },
                         false,
                         false
                    ).
                    addColumn(
                         'm_users.Username',
                    ).
                    addColumn(
                         'm_groupusers.GroupName',
                    ).
                    addColumn(
                         'm_users.Created',
                         null,
                         null,
                         false
                    ).
                    addColumn(
                         '',
                         null,
                         function (row, id) {
                              return `<a href='#' class='btn btn-info edit' data-bs-toggle='modal' data-bs-target='#ubahModal'>Ubah</a>
                              <a href='#' class='btn btn-danger delete' data-bs-toggle='modal' data-bs-target='#hapusModal'>Hapus</a>`;
                         },
                         false,
                         false
                    );
               let data = await datatables.populate();
               return ResponseData.status(200).json(data);
          } catch (e) {
               var result = {
                    Message: e.message,
                    Data: null,
                    Response: ResponseCode.DATA_NOT_FOUND
               }

               return ResponseData.status(400).json(result);
          }
     }

     add() {
          return View.make("office/m_user/add", { title: 'Pengguna' });
     }

     store() {
          return View.make("office/m_user/add", { title: 'Pengguna' });
     }


}

export default MuserController;