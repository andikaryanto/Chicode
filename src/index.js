// var isCLI = require.main === module;
// console.log(isCLI);
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
 require("./app")
