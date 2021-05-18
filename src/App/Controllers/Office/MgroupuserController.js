import ResponseCode from "../../Constants/ResponseCode.js";
import M_groupusers from "../../Models/M_groupusers.js";
import { renderToString } from 'react-dom/server';
import View from "../../../Core/Controller/View.js";
import ResponseData from "../../../Core/Controller/ResponseData.js";
import BaseController from "../BaseController.js";
import Redirect from "../../../Core/Controller/Redirect.js";
import DbConnection from "../../../Core/Database/Connection/DbConnection.js";
import M_users from "../../Models/M_users.js";
import ModelError from "../../Errors/ModelError.js";

class MgroupuserController extends BaseController {

    constructor() {
        super();
    }

    async index() {
        try {
            return View.make('office/m_groupuser/index', { title: 'Grup Pengguna' });
            // res.render('office/m_groupuser/index', { title : 'Grup Pengguna' } );
        } catch (e) {
            // var result = {
            //     Message: e.message,
            //     Data: null,
            //     Response: ResponseCode.DATA_NOT_FOUND
            // }

            // res.status(400).json(result);
        }
    }

    async getAllData() {
        try {
            let filter = {}
            let datatables = M_groupusers.datatables(filter);
            datatables.addDtRowClass('rowdetail').
                addDtRowId('Id').
                addColumn(
                    'Id',
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
                    'GroupName',
                ).
                addColumn(
                    'Description'
                ).
                addColumn(
                    'Created',
                    null,
                    null,
                    false
                ).
                addColumn(
                    '',
                    null,
                    function (row, id) {
                        return `<a href='/office/mgroupuser/${row.Id}/edit' class='btn btn-info edit'>Ubah</a>
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
        return View.make("office/m_groupuser/add", { title: 'Grup Pengguna' });
    }

    async store({ request, session }) {
        try {
            const body = request.body;
            let groupuser = new M_groupusers();
            groupuser.GroupName = body.Groupname;
            groupuser.Description = body.Description;
            if (! await groupuser.save())
                throw new ModelError("Gagal Menyimpan Grup Pengguna");

            return Redirect.to("/office/mgroupuser");
        } catch (e) {
            return Redirect.to("/office/mgroupuser/add");
        }
    }

    async edit({ params }) {
        const id = params.id;
        let groupuser = await M_groupusers.find(id);
        return View.make("office/m_groupuser/edit", { title: 'Grup Pengguna', data: groupuser });
    }


    async update({ request }) {
        const body = request.body;
        try {
            let groupuser = await M_groupusers.find(body.Id);
            groupuser.GroupName = body.Groupname;
            groupuser.Description = body.Description;
            if (! await groupuser.save())
                throw new ModelError("Gagal Mengubah Grup Pengguna");

            return Redirect.to("/office/mgroupuser");
        } catch (e) {
            return Redirect.to(`/office/mgroupuser/${body.Id}/edit`);
        }
    }

    async destroy({ request }) {
        const body = request.body;
        console.log(body);
        try {
            let groupuser = await M_groupusers.find(body.Id);
            console.log(groupuser);
            if (! await groupuser.delete())
                throw new ModelError("Gagal Menghapus Grup Pengguna");

            let result = {
                Message :  "Berhasil Menghapus Data",
                Data : null,
                Response : ResponseCode.OK
             }
            return ResponseData.status(200).json(result);
        } catch (e) {
            console.log(e);
            let result = {
                Message :  e.message,
                Data : null,
                Response : ResponseCode.FAILED_DELETE_DATA
             }
            return ResponseData.status(400).json(result);
        }
    }

}

export default MgroupuserController;