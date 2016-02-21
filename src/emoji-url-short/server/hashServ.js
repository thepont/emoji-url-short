var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer(); 
var punycode = require('punycode');
var app = express();
var db = require('./db');
var makehash = require('./makehash');

const HOSTNAME_SPLIT = 3;

function getId(req, res, next){
    db.get(req.params.id, (err, url)=>{
        if (!url || err){
            return next(err);
        }
        return res.redirect(url);
     });
}

export default function createHashServer(app){
    /**
     * Get id after trailing slash.
     */
    //app.get('/:id', getId);
    /**
     * Spit based on hostname
     * use the hostname infront of domain as the id
     */
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
        var url = req.body.url;
        makehash(url).then(data =>{
                db.set(data, url);
                return res.send({emoji : data});
        }).catch((err)=>{
            console.err(err);
            return req.send({message: "Seems broken 😞"});
        });
    }); 
    
}