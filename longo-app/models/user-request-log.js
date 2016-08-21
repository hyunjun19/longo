var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userRequestLogSchema = new Schema({
  level: String,
  datetime: Number,
  message: String,
  createdAt: Date
});

var UserRequestLog = mongoose.model('user-request-log', userRequestLogSchema);

module.exports = UserRequestLog;
