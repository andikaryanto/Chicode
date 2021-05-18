require('@babel/register')({
     presets: [
         [
             "@babel/preset-env",
             {
                 targets: {
                     node: "current"
                 }
             }
         ]
     ]
});
const { default: database } = require("./src/App/Config/Database");
module.exports = database;
