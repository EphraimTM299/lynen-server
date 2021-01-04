const express  = require('express')
const path = require('path')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')
const mongoSanitize = require('express-mongo-sanitize')	
const xss = require('xss-clean')
const colors = require('colors')
const hpp = require('hpp')
const rateLimit = require('express-rate-limit')
const errorHandler = require('./middleware/error.js')
const connectDB = require('./config/db.js')
const dotenv = require('dotenv')

const authRouter = require('./routes/auth.js')
const adminRouter = require('./routes/admin/index.js')
const userRouter = require('./routes/user.js')
const categoryRouter = require('./routes/category.js')

dotenv.config();

const app = express();
const http = require('http').createServer(app)

const PORT = process.env.PORT || 5000;
connectDB();
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// app.use(helmet());
app.use(xss());
// const limiter = rateLimit({
// 	windowMs: 10 * 60 * 1000,
// 	max: 100
// });
// app.use(limiter);
// app.use(hpp());
app.use(cors());
app.use(mongoSanitize());
app.use(express.json());

// app.use(express.static(path.join(__dirname, 'public')));

//Mount routes
// app.use('/api/v1/shops', require('./routes/shops'));


app.use('/api/v1/auth', authRouter);
app.use('/api/v1/admin',adminRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/categories', categoryRouter);

// app.use('/api/v1/blocks', require('./routes/unit'));
app.use(errorHandler);


const io = require('socket.io')(http
	
	, {
	cors: {
	  origin: "http://localhost:3000",
	  methods: ["GET", "POST", "PUT", "DELETE"],
	  allowedHeaders: ["my-custom-header"],
	  credentials: true
	},

  handlePreflightRequest: (req, res) => {
    res.writeHead(200, {
      "Access-Control-Allow-Origin": "http://localhost:3000",
      "Access-Control-Allow-Methods": "GET,POST",
      "Access-Control-Allow-Headers": "my-custom-header",
      "Access-Control-Allow-Credentials": true
    });
    res.end();
  }
  }
  )
  
io.on('connection', function(socket) {
	console.log('Socket.io has connected backend')
})


http.listen(PORT, () => console.log(`App running in ${process.env.NODE_ENV} on port ${PORT}`.green));




// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
	console.log(`Error: ${err.message}`.green);
	server.close(() => process.exit(1));
});


