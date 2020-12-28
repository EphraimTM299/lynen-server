import express  from 'express'
import {Server} from 'http'
// import {io} from 'socket.io'
import * as io from "socket.io"
import path from 'path'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'
import mongoSanitize from'express-mongo-sanitize'	
import xss from'xss-clean'
import colors from 'colors'
import hpp from'hpp'
import rateLimit from 'express-rate-limit'
import errorHandler from'./middleware/error.js'
import connectDB from './config/db.js'
import dotenv from 'dotenv'

import authRouter from './routes/auth.js'
import adminRouter from './routes/admin/index.js'
import userRouter from './routes/user.js'
import categoryRouter from './routes/category.js'

dotenv.config();
connectDB();
const app = express();
// const http = Server(app)
// const websocket = (io)(http)
const PORT = process.env.PORT || 5000;

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


// io.on('connection', function(socket) {
// 	console.log('Socket.io has connected')
// })

const server = app.listen(PORT, () => console.log(`App running in ${process.env.NODE_ENV} on port ${PORT}`.green));

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
	console.log(`Error: ${err.message}`.green);
	server.close(() => process.exit(1));
});


