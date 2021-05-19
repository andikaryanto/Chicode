import ResponseCode from "../../Constants/ResponseCode.js";
import M_wiretypes from "../../Models/M_wiretypes.js";
import { renderToString } from 'react-dom/server';
import View from "../../../Core/Controller/View.js";
import ResponseData from "../../../Core/Controller/ResponseData.js";
import BaseController from "../BaseController.js";
import Redirect from "../../../Core/Controller/Redirect.js";
import DbConnection from "../../../Core/Database/Connection/DbConnection.js";
import M_users from "../../Models/M_users.js";
import ModelError from "../../Errors/ModelError.js";
import DateFormat from "../../../Core/Libraries/DateFormat.js";
import File from "../../../Core/Libraries/File.js";
import approot from 'app-root-path';
import fs from 'fs';
import { parse } from 'fast-csv';
import UploadedFileError from "../../../Core/Errors/UploadedFileError.js";

class MwiretypeController extends BaseController {

    constructor() {
        super();
    }

    async index() {
        try {
            return View.make('office/m_wiretype/index', { title: 'Warna' });
            // res.render('office/m_wiretype/index', { title : 'Warna' } );
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
            let datatables = M_wiretypes.datatables(filter);
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
                    function (row, id) {
                        return DateFormat.getFromatedDate(row.Created)
                    },
                    false
                ).
                addColumn(
                    '',
                    null,
                    function (row, id) {
                        return `<a href='/office/mwiretype/${row.Id}/edit' class='btn btn-info edit'>Ubah</a>
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
        return View.make("office/m_wiretype/add", { title: 'Warna' });
    }

    async store({ request, session }) {
        try {
            const body = request.body;
            let wiretype = new M_wiretypes();
            wiretype.Name = body.Name;
            wiretype.Description = body.Description;
            wiretype.Created = DateFormat.getCurrentDate("YYYY-MM-DD HH:mm:ss");
            if (! await wiretype.save())
                throw new ModelError("Gagal Menyimpan Warna");

            return Redirect.to("/office/mwiretype");
        } catch (e) {
            return Redirect.to("/office/mwiretype/add");
        }
    }

    async edit({ params }) {
        const id = params.id;
        let wiretype = await M_wiretypes.find(id);
        return View.make("office/m_wiretype/edit", { title: 'Warna', data: wiretype });
    }


    async update({ request }) {
        const body = request.body;
        try {
            let wiretype = await M_wiretypes.find(body.Id);
            wiretype.Name = body.Name;
            wiretype.Description = body.Description;
            if (! await wiretype.save())
                throw new ModelError("Gagal Mengubah Warna");

            return Redirect.to("/office/mwiretype");
        } catch (e) {
            return Redirect.to(`/office/mwiretype/${body.Id}/edit`);
        }
    }

    async destroy({ request }) {
        const body = request.body;
        try {
            let wiretype = await M_wiretypes.find(body.Id);
            if (! await wiretype.delete())
                throw new ModelError("Gagal Menghapus Warna");

            let result = {
                Message: "Berhasil Menghapus Data",
                Data: null,
                Response: ResponseCode.OK
            }
            return ResponseData.status(200).json(result);
        } catch (e) {
            let result = {
                Message: e.message,
                Data: null,
                Response: ResponseCode.FAILED_DELETE_DATA
            }
            return ResponseData.status(400).json(result);
        }
    }

    async import({ request }) {
        const body = request.body;
        try {
            let file = new File("assets/upload/importwiretype", 2000, ["csv"]);
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


            let csvRows = [];
            let path = approot + "/src/" + file.getFileUrl();
            fs.createReadStream(path)
                .pipe(parse({ headers: true }))
                .on("error", (error) => {
                    throw error.message;
                })
                .on("data", (row) => {
                    csvRows.push(row);
                })
                .on("end", async () => {
                    try {
                        for (let row of csvRows) {
                            let wireType = new M_wiretypes();
                            wireType.Name = row.Nama;
                            wireType.Description = row.Nama;
                            wireType.Created = DateFormat.getCurrentDate("YYYY-MM-DD HH:mm:ss");
                            await wireType.validate();
                            if (! await wireType.save())
                                throw new ModelError("Gagal Import CSV");

                        }
                        fs.unlinkSync(path);
                    } catch(e) {
                        return Redirect.to("/office/mwiretype")
                    }
                });


            return Redirect.to("/office/mwiretype")
        } catch (e) {
            if (e instanceof ModelError) {
                console.log(e.message)
            }
            console.log(e.message);
            return Redirect.to("/office/mwiretype")
        }
    }

}

export default MwiretypeController;