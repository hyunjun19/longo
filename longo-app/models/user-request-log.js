var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

var userRequestLogSchema = new Schema({
    host: String,
    uri: String,
    method: String,
    queryParameter: String,
    status: String,
    os: String,
    device: String,
    browser: String,
    browserVersion: String,
    headerMap: Schema.Types.Mixed,
    parameterMap: Schema.Types.Mixed,
    userId: Number,
    requestElapsedTime: Number,
    requestDateTime: String,
    sessionKey: String,
    referer: String,
    createdAt: Date
});

var UserRequestLog = mongoose.model('user-request-log', userRequestLogSchema);

module.exports = UserRequestLog;
