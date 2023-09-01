const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');


const {
  logErrors,
  errorHandler,
  boomErrorHandler,
  ormErrorHandler,
} = require( "./middlewares/error.handler");


const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());

const whitelist = ['http://localhost:5173', 'https://myapp.co'];

const option = {
    origin: (origin, callback)=>{
        if(whitelist.includes(origin) || !origin){
            callback(null,true)
        }else{
            callback(new Error('no permitido'));
        }
    }

}
app.use(cors(option));

app.get('/',(req,res)=>{
    res.send('este es mi server')
})
routerApi(app)

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(PORT, ()=>{
    console.log('mi Port ' + PORT)
}

)