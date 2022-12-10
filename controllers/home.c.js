const e = require('express')
const homeM = require('../models/home.m')
var jwt = require('jsonwebtoken');

function formatURL(url) {
    if (url[0] == '/') url = url.slice(1, url.length)
    var lastIndexMark = url.lastIndexOf('?')
    if (lastIndexMark != -1) url = url.slice(0, lastIndexMark)
    if (url[url.length - 1] == -1) url = url.slice(0, url.length - 1)
    return url
}

