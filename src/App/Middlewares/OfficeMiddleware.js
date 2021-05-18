import jwt from "jsonwebtoken";
import M_users from "../Models/M_users.js";

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
const OfficeMiddleware = async function (req, res, next) {
     try {
          if (req.session.token == undefined || req.session.token == null) {
               res.redirect("/office/login")
          } else {
               let token = req.session.token;
               let decoded = jwt.decode(token,  {complete : true});
               let muser = decoded.payload;
               let user = await M_users.findOrFail(muser.Id);
               next();
          }
     } catch (e) {
          res.redirect("/office/login");
     }
}

export default OfficeMiddleware;