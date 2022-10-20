import express from 'express';
import mongoose from 'mongoose';
import config from './config/config.js';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import viewsRouter from './routes/views.router.js';

const app = express();
const PORT = process.env.PORT||8080;
const connection = mongoose.connect(`mongodb+srv://${config.mongo.USER}:${config.mongo.PASSWORD}@codercluster.w5adegs.mongodb.net/${config.mongo.DATABASE}?retryWrites=true&w=majority`)

app.use(express.json());

app.engine('handlebars',handlebars.engine());
app.set('views',__dirname+'/views');
app.set('view engine','handlebars');

app.use('/',viewsRouter);

app.listen(PORT,()=>console.log(`Listening on ${PORT}`))