import Redirect from "../../../Core/Controller/Redirect.js";
import ResponseData from "../../../Core/Controller/ResponseData.js";
import View from "../../../Core/Controller/View.js";
import ResponseCode from "../../Constants/ResponseCode.js";
import ModelError from "../../Errors/ModelError.js";
import M_groupusers from "../../Models/M_groupusers.js";
import M_users from "../../Models/M_users.js";
import File from "../../../Core/Libraries/File.js";

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
                         'm_users.Photo',
                         null,
                         function (row, i) {
                              return `<div class='img-banner' style='background: url("/${row.Photo}")'></div>`;
                         },
                         false,
                         false
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
                              return `<a href='/office/muser/${row.Id}/edit' class='btn btn-info edit'>Ubah</a>
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

     async add() {
          let roles = await M_groupusers.findAll();
          return View.make("office/m_user/add", { title: 'Pengguna', roles: roles });
     }

     async store({request}) {
          const body = request.body;
          try {
               let file = new File("assets/upload/users", 2000, ["jpg", "png"]);
               let files = request.getFiles("file");

               if (Array.isArray(files)) {
                    for (let img in files) {
                         if (! await file.upload(files[img])) {
                              throw new UploadedFileError("Gagal")
                         }
                    }
               } else {
                    if (! await file.upload(files)) {
                         throw new UploadedFileError("Gagal")
                    }
               }

               let user = new M_users();
               user.Username = body.Username;
               user.setPassword(body.Password);
               user.M_Groupuser_Id = body.M_Groupuser_Id;
               user.Photo = file.getFileUrl();
               if(! await user.save())
                    throw new ModelError("Gagal Menyimpan Data Pengguna")

               return Redirect.to("/office/muser")
          } catch (e) {
               return Redirect.to("/office/muser")
          }
     }

     async edit({ params }) {
          const id = params.id;
          let user = await M_users.find(id);
          return View.make("office/m_user/edit", { title: 'Pengguna', data: user });
      }


}

export default MuserController;