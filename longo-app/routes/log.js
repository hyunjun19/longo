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
        let ret = _.merge({ title: 'longo-query' }, results);
        res.render('log-query', ret);
    });
});

router.get('/:phase/:bucket', function(req, res) {
    if (!req.query.q) {
        res.render('log');
        return;
    }

    try {
        var query  = JSON.parse(req.query.q || '{}');
        var column = JSON.parse(req.query.c || '{}');
        var limit  = Number(req.query.limit) || 10;
        var collection = getCollection(req.db, req.params.phase, req.params.bucket);
        collection
            .find(query, { 'fields': column, 'limit': limit })
            .then(function(docs){
                res.send(docs);
            });
    } catch(ex) {
        res.sendStatus(400);
        console.log(ex);
    }
});

router.post('/:phase/:bucket', function(req, res) {
    if (!req.params.phase || !req.params.bucket) {
        res.sendStatus(400);
        return;
    }

    res.header('x-response-status', 'OK');
    res.sendStatus(204);

    saveBucketQuietly(req);
});

function getCollection(db, phase, bucket) {
    return db.get(phase + '::' + bucket);
}

function saveBucketQuietly(req) {
    var collection = getCollection(req.db, req.params.phase, req.params.bucket);
    var doc = req.body;
    doc.createAt = new Date();

    collection.insert(doc);
}

module.exports = router;
