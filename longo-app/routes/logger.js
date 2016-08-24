var express = require('express');
var router  = express.Router();
var UserRequestLog = require('../models/user-request-log');

router.get('/', function(req, res, next) {
    res.send('logger is ready.');
});

router.post('/:buket', function(req, res, next) {
    res.header('x-response-status', 'OK');
    res.sendStatus(204);

    saveBuket(req);
});

function saveBuket(req) {
    switch (req.params.buket) {
        case 'user-request-log':
            var userRequestLog = new UserRequestLog(req.body);
            userRequestLog.createdAt = new Date();
            userRequestLog.save(function(err) {
                if (err) throw err;
                //console.log('user-request-logs saved successfully!');
            });
            break;
        default:
            console.log(req.params.buket + ' buket is Unknown.');
            break;
    }
}

module.exports = router;
