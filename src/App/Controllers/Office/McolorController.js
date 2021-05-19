import ResponseCode from "../../Constants/ResponseCode.js";
import M_colors from "../../Models/M_colors.js";
import { renderToString } from 'react-dom/server';
import View from "../../../Core/Controller/View.js";
import ResponseData from "../../../Core/Controller/ResponseData.js";
import BaseController from "../BaseController.js";
import Redirect from "../../../Core/Controller/Redirect.js";
import DbConnection from "../../../Core/Database/Connection/DbConnection.js";
import M_users from "../../Models/M_users.js";
import ModelError from "../../Errors/ModelError.js";
import DateFormat from "../../../Core/Libraries/DateFormat.js";

class McolorController extends BaseController {

    constructor() {
        super();
    }

    async index() {
        try {
            return View.make('office/m_color/index', { title: 'Warna' });
            // res.render('office/m_color/index', { title : 'Warna' } );
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
            let datatables = M_colors.datatables(filter);
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
                    'Name',
                ).
                addColumn(
                    'Description'
                ).
                addColumn(
                    'Created',
                    null,
                    function(row, id){
                        return DateFormat.getFromatedDate(row.Created)
                    },
                    false
                ).
                addColumn(
                    '',
                    null,
                    function (row, id) {
                        return `<a href='/office/mcolor/${row.Id}/edit' class='btn btn-info edit'>Ubah</a>
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
        return View.make("office/m_color/add", { title: 'Warna' });
    }

    async store({ request, session }) {
        try {
            const body = request.body;
            let color = new M_colors();
            color.Name = body.Name;
            color.Description = body.Description;
            color.Created = DateFormat.getCurrentDate("YYYY-MM-DD HH:mm:ss");
            if (! await color.save())
                throw new ModelError("Gagal Menyimpan Warna");

            return Redirect.to("/office/mcolor");
        } catch (e) {
            return Redirect.to("/office/mcolor/add");
        }
    }

    async edit({ params }) {
        const id = params.id;
        let color = await M_colors.find(id);
        return View.make("office/m_color/edit", { title: 'Warna', data: color });
    }


    async update({ request }) {
        const body = request.body;
        try {
            let color = await M_colors.find(body.Id);
            color.Name = body.Name;
            color.Description = body.Description;
            if (! await color.save())
                throw new ModelError("Gagal Mengubah Warna");

            return Redirect.to("/office/mcolor");
        } catch (e) {
            return Redirect.to(`/office/mcolor/${body.Id}/edit`);
        }
    }

    async destroy({ request }) {
        const body = request.body;
        try {
            let color = await M_colors.find(body.Id);
            if (! await color.delete())
                throw new ModelError("Gagal Menghapus Warna");

            let result = {
                Message :  "Berhasil Menghapus Data",
                Data : null,
                Response : ResponseCode.OK
             }
            return ResponseData.status(200).json(result);
        } catch (e) {
            let result = {
                Message :  e.message,
                Data : null,
                Response : ResponseCode.FAILED_DELETE_DATA
             }
            return ResponseData.status(400).json(result);
        }
    }

}

export default McolorController;