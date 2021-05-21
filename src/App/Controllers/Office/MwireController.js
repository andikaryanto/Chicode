import ResponseCode from "../../Constants/ResponseCode.js";
import M_wires from "../../Models/M_wires.js";
import { renderToString } from 'react-dom/server';
import View from "../../../Core/Controller/View.js";
import ResponseData from "../../../Core/Controller/ResponseData.js";
import BaseController from "../BaseController.js";
import Redirect from "../../../Core/Controller/Redirect.js";
import DbConnection from "../../../Core/Database/Connection/DbConnection.js";
import M_users from "../../Models/M_users.js";
import ModelError from "../../Errors/ModelError.js";
import DateFormat from "../../../Core/Libraries/DateFormat.js";
import M_colors from "../../Models/M_colors.js";
import M_wiretypes from "../../Models/M_wiretypes.js";
import UserProc from "../../BusinessProcess/UserProc.js";
import WireStatus from "../../Enum/WireStatus.js";

class MwireController extends BaseController {

    constructor() {
        super();
    }

    async index() {
        try {
            return View.make('office/m_wire/index', { title: 'Kabel' });
        } catch (e) {
        }
    }

    async getAllData() {
        try {
            let filter = {}
            let datatables = M_wires.datatables(filter);
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
                        return `<a href='/office/mwire/${row.Id}/edit' class='btn btn-info edit'>Ubah</a>
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

    async add({session}) {

        const colors = await M_colors.findAll();
        const types = await M_wiretypes.findAll();

        const params = {
            order : {
                Created : "DESC"
            }
        };
        const model = await M_wires.findOneOrNew(params);
        return View.make("office/m_wire/add", { title: 'Kabel', colors, types, model });
    }

    async store({ request, session }) {

        const user = UserProc.decode(session.token);
        try {
            const body = request.body;
            let wire = new M_wires();
            wire.Name = body.Name;
            wire.M_Color_Id = body.M_Color_Id;
            wire.M_Wiretype_Id = body.M_Wiretype_Id;
            wire.Length = body.Length;
            wire.Bending = body.Bending;
            wire.Loss = body.Loss;
            wire.Status = WireStatus.REQUESTED;
            wire.IsActive = 0;
            wire.Created = DateFormat.getCurrentDate("YYYY-MM-DD HH:mm:ss");
            wire.CreatedBy = user.Username;
            console.log(wire);
            if (! await wire.save())
                throw new ModelError("Gagal Menyimpan Kabel");

            return Redirect.to("/office/mwire/add");
        } catch (e) {
            return Redirect.to("/office/mwire/add");
        }
    }

    async edit({ params }) {
        const id = params.id;
        let wire = await M_wires.find(id);
        return View.make("office/m_wire/edit", { title: 'Kabel', data: wire });
    }


    async update({ request }) {
        const body = request.body;
        try {
            let wire = await M_wires.find(body.Id);
            wire.Name = body.Name;
            wire.Description = body.Description;
            if (! await wire.save())
                throw new ModelError("Gagal Mengubah Kabel");

            return Redirect.to("/office/mwire");
        } catch (e) {
            return Redirect.to(`/office/mwire/${body.Id}/edit`);
        }
    }

    async destroy({ request }) {
        const body = request.body;
        try {
            let wire = await M_wires.find(body.Id);
            if (! await wire.delete())
                throw new ModelError("Gagal Menghapus Kabel");

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

export default MwireController;