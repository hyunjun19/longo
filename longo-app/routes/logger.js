var express = require('express');
var router  = express.Router();
var UserRequestLog = require('../models/user-request-log');

router.get('/', function(req, res, next) {
    if (!req.query.q) {
        res.render('logger');
        return;
    }

    try {
        var query  = JSON.parse(req.query.q || '{}');
        var column = JSON.parse(req.query.c || '{}');
        var limit  = Number(req.query.limit) || 10;
        UserRequestLog.find(query, column, function(err, logs){
            if (err) throw err;

            res.setHeader('Content-Type', 'application/json');
            res.send(logs);
        }).limit(limit);
    } catch(ex) {
        res.sendStatus(400);
    }
});

router.post('/:bucket', function(req, res, next) {
    res.header('x-response-status', 'OK');
    res.sendStatus(204);

    saveBucket(req);
});

function saveBucket(req) {
    switch (req.params.bucket) {
        case 'user-request-log':
            var userRequestLog = new UserRequestLog(req.body);
            userRequestLog.createdAt = new Date();
            userRequestLog.save(function(err, userRequestLog) {
                if (err) throw err;
                // console.log('user-request-logs ' + userRequestLog._id + ' saved successfully!');
            });
            break;
        default:
            console.log(req.params.bucket + ' bucket is Unknown.');
            break;
    }
}

module.exports = router;
