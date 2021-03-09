const express  = require('express')
const path = require('path')
const helmet = require('helmet')
const morgan = require('morgan')
const {EventEmitter} = require('events')
const cors = require('cors')
const mongoSanitize = require('express-mongo-sanitize')	
const xss = require('xss-clean')
const colors = require('colors')
const hpp = require('hpp')
const compresion = require('compression')
const rateLimit = require('express-rate-limit')
const errorHandler = require('./middleware/error.js')
const {mongoErrorHandler} = require('./middleware/mongoErrors')
const connectDB = require('./config/db.js')
const nodemailer = require("nodemailer");
const dotenv = require('dotenv')

const authRouter = require('./routes/auth.js')
const adminRouter = require('./routes/admin/')
const managerRouter = require('./routes/manager/')
const userRouter = require('./routes/user.js')
const categoryRouter = require('./routes/category.js')


dotenv.config();

const app = express();

// Event Emitter
const mtt = new EventEmitter()
app.set('eventEmitter', mtt)


const http = require('http').createServer(app)

const PORT = process.env.PORT || 5000;
connectDB();
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
// var corsOptions = {
// 	origin: 'https://lynen.netlify.app',
// 	optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
//   }
app.use(cors());
// app.use(helmet());
app.use(xss());
const limiter = rateLimit({
	windowMs: 10 * 60 * 1000,
	max: 100
});
app.use(limiter);
app.use(hpp());

app.use(compresion())
app.use(mongoSanitize());
app.use(express.json());
app.use(mongoErrorHandler);
// app.use(express.static(path.join(__dirname, 'public')));

//Mount routes
// app.use(function (req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
//     next();
// });

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "https://lynen.netlify.app"); // update to match the domain you will make the request from
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
  });
app.use('/', (req, res) => res.json({success:true, message: 'API updated'}));
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/admin',adminRouter);
app.use('/api/v1/manager',managerRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/categories', categoryRouter);

// app.use('/api/v1/blocks', require('./routes/unit'));
app.use(errorHandler);


const io = require('socket.io')(http
	
	, {
	cors: {
	  origin: "*",
	  methods: ["GET", "POST", "PUT", "DELETE"],
	  allowedHeaders: ["my-custom-header"],
	  credentials: true
	},

  handlePreflightRequest: (req, res) => {
    res.writeHead(200, {

      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, PATCH, DELETE, OPTIONS"
    //   "Access-Control-Allow-Headers": "my-custom-header",
    //   "Access-Control-Allow-Credentials": true
    });
    res.end();
  }
  }
  )
  
io.on('connection', function(socket) {
	console.log('Socket.io has connected backend')
})


http.listen(PORT, () => console.log(`App running in ${process.env.NODE_ENV} on port ${PORT}`.green));

// mtt.on('testing', (data) => {
//   console.log('Event Emitter ',data)
// })


// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
	console.log(`Error: ${err.message}`.green);
	http.close(() => process.exit(1));
});


