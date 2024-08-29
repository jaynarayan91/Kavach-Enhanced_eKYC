//imports
const express = require('express');
const connectDB = require('./db/connect');
const errorHandlerMiddleware = require('./Middleware/errorMiddleware');
const morgan = require('morgan');
const cors = require('cors');
const multer = require('multer')
require('dotenv').config();

require('express-async-errors');

//security
const mangoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');

const app = express();
app.set('view engine', 'ejs');
app.set('views', './views');

// routes import
const authRoutes = require('./routes/authRoutes');
const formRoutes = require('./routes/formRoutes');

const corsOptions = {
    origin: ["http://localhost:3000", "http://localhost:5000"],
    methods: "GET, POST, PUT, DELETE, HEAD, PATCH",
    credentials: true,
}

const upload = multer({ dest: "uploads/" });

app.use(express.json());
app.use(morgan('dev'));
app.use(cors(corsOptions));
app.use(helmet());
app.use(mangoSanitize());
app.use(express.urlencoded({ extended: false }));
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/form', formRoutes);

app.use(errorHandlerMiddleware);
const port = process.env.PORT || 3002;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`Server started on port ${port}`);
        });
    } catch (error) {
        console.log("There was an error starting the server!");
        console.log(error);
    }
}

start();