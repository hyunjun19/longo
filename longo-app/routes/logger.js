'use strict';

var express = require('express');
var router  = express.Router();

router.get('/:phase/:bucket', function(req, res) {
    if (!req.query.q) {
        res.render('logger');
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

function saveBucketQuietly(req) {
    var collection = getCollection(req.db, req.params.phase, req.params.bucket);
    var doc = req.body;
    doc.createAt = new Date();

    collection.insert(doc);
}

function getCollection(db, phase, bucket) {
    return db.get(phase + '::' + bucket);
}

module.exports = router;
