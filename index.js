const express = require('express')
const mongoose = require("mongoose");
const errorHandler = require('./middleware/error');
const session = require('express-session');
const redis = require('redis');
let RedisStore = require("connect-redis")(session)


const { 
    MONGO_USER, 
    MONGO_PASSWORD, 
    MONGO_IP, 
    MONGO_PORT, 
    REDIS_URL,
    REDIS_PORT,
    SESSION_SECRET
} = require('./config/config');

let redisClient = redis.createClient({
    host:REDIS_URL,
    port:REDIS_PORT
})


const mongoURL= `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}?authSource=admin`
const postRoute = require("./routes/post");
const userRoute = require("./routes/user");

const connectWithRetry =()=> {
    mongoose.connect(mongoURL, {
        useUnifiedTopology:true,
        useNewUrlParser:true
    }).then(() => {
        console.log("successfully connected to DB");
    }).catch((e)=> {
        console.log(e);
        setTimeout(connectWithRetry, 5000)
    })
}

connectWithRetry();
const app = express()

app.use(session({
    store: new RedisStore({client:redisClient}),
    secret:SESSION_SECRET,
    cookie:{
        secure:false,
        httpOnly:true,
        maxAge:30000
    }
}));

app.use(session({
    store: new RedisStore({
      client: redisClient
    }),
    secret: 'very secret secret to encyrpt session',
    cookie:{
                secure:false,
                httpOnly:true,
                maxAge:30000
            }

  }));
app.use(express.json());
const port = process.env.PORT || 3000
app.enable("trust proxy");
app.get('/', (req, res)=> {
    res.send("<h2>Hello welcome codeman</h2>")
})

app.use('/api/v1/auth', userRoute);
app.use('/api/v1/post', postRoute);
app.use(errorHandler);

app.listen(port, ()=> console.log(`listening on port ${port}`))