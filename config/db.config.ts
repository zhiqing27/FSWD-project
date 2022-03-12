var mongoose = require('mongoose')
var url = "mongodb://localhost:27017/360sunrise";
mongoose.connect(url, (err: any) => {
if (err) throw err;
console.log('db connected')
})