/*
 * @Description: 
 * @Author: Retric
 * @Github: https://github.com/RetricSu
 * @Date: 2019-08-23 15:24:10
 * @LastEditors: Retric
 * @LastEditTime: 2019-08-26 18:32:55
 */

const Vue = require('vue');
var default_config = require('../services/config');

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const app = require("electron").remote.app;
var path = require("path");
const dbPath = path.join(app.getPath("userData"), "db.json");

const adapter = new FileSync(dbPath);
const db = low(adapter);

// Set some defaults (required if your JSON file is empty)
db.defaults({ preferences:default_config })
  .write()
 
module.exports = db;
