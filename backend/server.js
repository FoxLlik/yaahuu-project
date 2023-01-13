const express = require("express");
const path = require("path");

const cors = require("cors")

const morgan = require("morgan");
const rfs = require('rotating-file-stream');
const cookieParser = require('cookie-parser');

// Аппын тохиргоог process.env руу ачаалах
const dotenv = require("dotenv")
dotenv.config({ path: "./config/config.env" });

const colors = require("colors");
const { Server } = require("socket.io");
// Routes
const userRoutes = require("./routes/user")

// middleware оруулж ирэх
const errorHandler = require("./middleware/errorHandler")
const successFn = require("./middleware/successFn");

// mongodb тохиргоо оруулж ирэх
const db = require("./config/db");
db.dbConntect()

// redis
// const redis = require("./utils/redis")

// create a rotating write stream
var accessLogStream = rfs.createStream('access.log', {
    interval: '1d', // rotate daily
    path: path.join(__dirname, 'log')
})

// socket card13
const { card13 } = require('./socket/card13')

var whitelist = [
    process.env.CLIENT_URL,
    "http://192.168.0.195:3000",
    "http://192.168.0.145:3000"
]

var corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    allowedHeaders: "Authorization, Set-Cookie, Content-Type, Accept, SameSite",
    methods: "GET, POST, PUT, DELETE",
    credentials: true,
}

// start app
const app = express();

// body parser
app.use(express.json());

// setup the logger
app.use(morgan("dev"))
app.use(morgan('combined', { stream: accessLogStream }))

//middlewares
app.use(cors(corsOptions))
app.use(successFn)
app.use(cookieParser())

// routes

app.use("/api/v1/user", userRoutes)
app.use(errorHandler)
app.use('/public', express.static('../backend/public/'));

app.get('/Game_1', (req, res) => {
    res.sendFile(__dirname + '/game_1.html');
});

app.get('/room/', (req, res) => {
    var name = req.query.name
    res.render(path.join(__dirname,'/rooms.html'),{rooms: name})
});

const server = app.listen(
    process.env.PORT,
    console.log(`Express сервер ${process.env.PORT} порт дээр аслаа...`.rainbow.bold)
)

//  Socket холбох нь
const io = new Server(server, { cors: corsOptions });

const card13Space = io.of('/card13')
card13(card13Space)

// Сервер дээр алдаа гарсан үед ажиллана.
process.on("unhandledRejection", (err, promise) => {
    console.log(`Сервер дээр алдаа гарлаа: ${err.message}`.red.underline.bold);
    server.close(() => {
        process.exit(1);
    });
})
