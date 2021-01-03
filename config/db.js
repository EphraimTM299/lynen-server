const mongoose = require( "mongoose");

const connectDB = async () => {
  
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    }).then(res => {
     
      // const server = http.listen(PORT, () => console.log(`App running in ${process.env.NODE_ENV} on port ${PORT}`.green));
// const io = require('socket.io')(server)
// io.on('connection', function(socket) {
// 	console.log('Socket.io has connected')
// })
console.log(`MongoDb Connected on ${res.connection.host}`);
    }).catch((error) => {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  })
};


module.exports = connectDB;
