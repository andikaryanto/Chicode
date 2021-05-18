import UserProc from "../../BusinessProcess/UserProc.js";
import CommonLib from "../../Libraries/CommonLib.js";
import BaseController from "../BaseController.js";
import jwt from "jsonwebtoken";
import e from "express";
import M_users from "../../Models/M_users.js";
import Controller from "../../../Core/Controller/Controller.js";
import Redirect from "../../../Core/Controller/Redirect.js";
import View from "../../../Core/Controller/View.js";
import ResponseData from "../../../Core/Controller/ResponseData.js";
import ModelError from "../../Errors/ModelError.js";

class LoginController extends Controller {


    async index({ request, session, ...props }) {
       
        try {
            if (session.token != undefined || session.token == null) {
                let token = req.session.token;
                let decoded = jwt.decode(token, { complete: true });
                let muser = decoded.payload;
                await M_users.findOrFail(muser.Id);
                return Redirect.to("/office/mgroupuser");
            } else {
                return View.make('office/login/login', { title: 'Hey', message: 'Hello there!' });
            }
        } catch (e) {
            return View.make('office/login/login', { title: 'Hey', message: 'Hello there!' });
        }
    }

    async doLogin({ request, session }) {

        try {
            const body = request.body;
            let muser = await UserProc.login(body.Username, body.Password, true);
            if (CommonLib.isNull(muser))
                throw new ModelError("Data pengguna tidak valid");

            let token = jwt.sign(muser.toJson(), CommonLib.getKey());
            session.token = token;
            session.userlanguage = "id";
            session.save();
            return Redirect.to("/office/mgroupuser");
        } catch (e) {
            session.flashData("error", e.message);
            return Redirect.to("/office/login")
        }
    }

    async doLogout({ request, session }) {
        session.destroy();
        return Redirect.to("/office/login");

    }

    test() {
        return View.html("aadasd");
    }
}

export default LoginController;