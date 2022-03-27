import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import fileupload from 'express-fileupload';
import history from 'connect-history-api-fallback';
import path from 'path';

const app = express();

// MIddlewares
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(fileupload({useTempFiles: true}));


//Routes
app.use('/', require('./routes/auth.routes'));
app.use('/admin', require('./routes/admin.routes'));

//Middlewares for Vue
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));
console.log(__dirname);
//Settings
app.set('port', process.env.PORT || 3000)

app.listen(app.get('port'), ()=>{
    console.log('Server on port '+ app.get('port'));
});