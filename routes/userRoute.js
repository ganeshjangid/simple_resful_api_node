const express=require('express');
const multer = require('multer');
const path = require('path');
const debug = require('debug')('nyapp:userrouter');

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'../public/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload=multer({storage:storage});

const router=express.Router();

let users = [{
        'id': 0,
        'name': 'a',
        'age': 2
    },
    {
        'id': 1,
        'name': 'b',
        'age': 3
    }
];

router.get('/',(req,res)=>{
    return res.json(users);
});

router.get('/:id', (req, res)=> {
    let id = req.params.id;
    return res.send(users[id]);
});

router.post('/', (req, res) =>{
    users.push(req.body);
    return res.send(users);
});


router.post('/regsiter', upload.single('file'), function (req, res,next) {
    const files = req.file;
    console.log(files);
    
   //return res.send(file);
});

router.put('/:index', function (req, res) {
    let index = req.params.index;
    users[index] = req.body;
    return res.send(users);
});

router.delete('/last', function (req, res) {
    res.send(users.pop());
});

module.exports=router;


