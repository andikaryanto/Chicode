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
            let filter = {
                join: {
                    m_colors: {
                        key: ["m_wires.M_Color_Id", " m_colors.Id"],
                        type: "left"
                    },
                    m_wiretypes: {
                        key: ["m_wires.M_Wiretype_Id", "m_wiretypes.Id"],
                        type: "left"
                    }
                }
            }
            let datatables = M_wires.datatables(filter);
            datatables.addDtRowClass('rowdetail').
                addDtRowId('m_wires.Id').
                addColumn(
                    'm_wires.Id',
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
                    'm_wires.Name',
                ).
                addColumn(
                    'm_colors.Name.Warna'
                ).
                addColumn(
                    'm_wiretypes.Name.Jenis'
                ).
                addColumn(
                    'm_wires.Length',
                ).
                addColumn(
                    'm_wires.Bending',
                ).
                addColumn(
                    'm_wires.Loss',
                ).
                addColumn(
                    'm_wires.Status', null,
                    function (row, i) {
                        let status = "";
                        if (row.Status == WireStatus.REQUESTED)
                            status = "Diajukan";

                        if (row.Status == WireStatus.APPROVED)
                            status = "Diterima";

                        if (row.Status == WireStatus.REJECTED)
                            status = "Ditolak";
                        return status;
                    }
                ).
                addColumn(
                    'm_wires.IsActive',
                    null,
                    function (row, i) {
                        return row.IsActive == 1 ? "<div class='text-success'><b>Ya</b></div>" : "Tidak";
                    }
                ).
                addColumn(
                    'm_wires.Created',
                    null,
                    function (row, id) {
                        return DateFormat.getFromatedDate(row.Created)
                    },
                    false
                ).
                addColumn(
                    'm_wires.CreatedBy',

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

    async add({ session }) {

        const colors = await M_colors.findAll();
        const types = await M_wiretypes.findAll();

        const params = {
            order: {
                Created: "DESC"
            }
        };
        const model = await M_wires.findOneOrNew(params);
        return View.make("office/m_wire/add", { title: 'Kabel', colors, types, model });
    }

    async store({ request, session }) {

        const user = UserProc.decode(session.token);
        try {
            const body = request.body;
            const params = {
                where: {
                    Status: WireStatus.REQUESTED
                }
            }
            let wire = M_wires.findOneOrNew(params);
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



}

export default MwireController;