import ResponseCode from "../Constants/ResponseCode.js";
import jwt from "jsonwebtoken";

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
const ApiMiddleware = function (req, res, next) {
     try {
          let token = req.headers.authorization;
          // let token = "asdasd";
          if (token == undefined || token == null) {
               throw new Error("Token anda Kosong")
          }

          let decoded = jwt.decode(token, {complete : true});
          if(decoded == null)
               throw new Error("Invalid Token");

          next();
     } catch (e) {
          let result = {
               Message : e.message,
               Data : null,
               Response : ResponseCode.FAILED_TO_VERIFY
          }
          res.status(400).json(result);
     }
}

export default ApiMiddleware;