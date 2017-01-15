'use strict';

const express = require('express');
const _       = require('lodash');
const async   = require('async');
const router  = express.Router();

router.get('/', function(req, res) {
    async.parallel({
        phases: function(callback){
            req.db.get('phases')
                .find({}, { sort: { order: 1 } })
                .then(function (docs) {
                    callback(null, docs);
                });
        },
        buckets: function(callback){
            req.db.get('buckets')
                .find({}, { sort: { order: 1 } })
                .then(function (docs) {
                    callback(null, docs);
                });
        }
    }, function(err, results) {
        let ret = _.merge({ title: '[longo] query' }, results);
        res.render('query', ret);
    });
});

router.get('/:phase/:bucket', function(req, res) {
    try {
        var query  = JSON.parse(req.query.query  || '{}');
        var sort   = JSON.parse(req.query.sort   || '{ "_id": -1 }');
        var limit  = _.toNumber(req.query.limit) || 1000;
        req.db.get(`${req.params.phase}::${req.params.bucket}`)
            .find(query, { 'limit': limit, 'sort': sort })
            .then(function(docs){
                res.send(docs);
            });
    } catch(ex) {
        res.sendStatus(400);
        console.error(ex);
    }
});

module.exports = router;
