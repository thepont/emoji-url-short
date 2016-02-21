var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer(); 
var punycode = require('punycode');
var app = express();
var db = require('./db');
var makehash = require('./makehash');
console.log(makehash);

var test = makehash('test.g').then(data => {
    console.log(data);
});

const HOSTNAME_SPLIT = 3;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
    console.log(req.method,decodeURI(req.path));
    next();
});

function getId(req, res, next){
    db.get(req.params.id, (err, url)=>{
        if (!url || err){
            return next(err);
        }
        return res.redirect(url);
     });

}


app.get('/:id', getId);

app.get('/', (req, res, next) =>{
    var hostnames = punycode.toUnicode(req.hostname).split('.');
    req.params.id = hostnames[hostnames.length-HOSTNAME_SPLIT];
    console.log(req.params.id);
    if(req.params.id == null)
    {
        return next();
    }
    return getId(req, res, next);
});

app.post('/', (req, res, next) => {
    console.log('here');
    var url = req.body.url;
    console.log('hash for url :', url);
    makehash(url).then(data =>{
            console.log(data);
            db.set(data, url);
            console.log(data);
            return res.send({emoji : data});
    }).catch((err)=>{
        console.err(err);
        return req.send({message: "Seems broken 😞"});
    });
});

app.listen(3001, function () {
      console.log('Example app listening on port 3001!');
});
