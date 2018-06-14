var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var client = {
  local:'mongodb://localhost:27017/TodoApp',
  heroku:'mongodb://smithshelke:smith11mr@ds159400.mlab.com:59400/mydb'
}
mongoose.connect(client.heroku||client.local);
module.exports = {
  mongoose
};
