'use strict'

var express  = require('express');
var UrlController = require('../controllers/url');

var api = express.Router();

var md_auth = require('../middlewares/authenticated');

api.get('/:id?', md_auth.ensureToken , UrlController.getShorthand);
api.post('/api/create', md_auth.ensureToken ,UrlController.saveShortHand);
//This route was created because I could not copy and pasted the given token on the coding task
api.post('/api/token', UrlController.user);

module.exports = api;