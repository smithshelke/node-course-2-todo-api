var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://smithshelke:smith11mr@ds159400.mlab.com:59400/mydb');
module.exports = {
  mongoose
};
