import dotenv from 'dotenv';
dotenv.config();

const VerifyCsrf = async function (err, req, res, next) {
     let isApi = req.originalUrl.split("/")[1] == 'api';
     if (process.env.CSRF_USAGE == "true" && !isApi) {
          if (err.code == "EBADCSRFTOKEN")
               res.send("Invalid CSRF Token");
          else
               next();
     } else {
          next();
     }
}

export default VerifyCsrf;