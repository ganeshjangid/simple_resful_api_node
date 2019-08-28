const express=require('express');
const app=new express();
const debug = require('debug')('simple_resful_api:server');
const path=require('path');
const multer=require('multer');
const logger=require('morgan');
const serveIndex = require('serve-index');
const port = process.env.PORT || 2565;


const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./public/uploads');
    },
    filename:(req,file,cb)=>{
        cb(null, file.filename + '-' + Date.now() + path.extname(file.originalname));
    }
});

//will be using this for uplading
const uploading=multer({storage:storage});


//get router
const userRouter = require('./routes/userRoute');

app.use(logger('tiny'));
app.use(express.json());
app.use(express.urlencoded({extended :false}));

app.use('/ftp', express.static('public'), serveIndex('public', {
    'icons': true
}));
/* 

app.get('/',(req,res,next)=>{

    res.json({
        name:'ganesh',
        age:25
    });
});

app.post('/testUpload', uploading.single('file'), function (req, res) {
    console.log(req.file);
    console.log('storage location is ', req.hostname + '/' + req.file.path);
    return res.send(req.file);
});

 */

app.use('/users', userRouter);
app.listen(port,()=> console.log(`Server is running on ${port}`));


/* 

http://172.29.64.51:2565/users


*/