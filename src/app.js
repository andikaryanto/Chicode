
const express = require('express');
const { default: App } = require('./Core/App');
const { default: DateFormat } = require('./Core/Libraries/DateFormat');


const app = express();
App.run(app, express);
     
