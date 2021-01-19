const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const {getSetUnion, getSetIntersection, getSetDiff, dateDiff} = require('./function.js');

app.get('/getDateDiff/:date1/:date2',async (req, res, next)=>{
    try{
        console.log(req.params);
        res.send(await dateDiff(req.params.date1,req.params.date2));
    }
    catch(err){
        next(err);
    }
});

app.get('/getSetUnion/:set1/:set2',async (req, res, next)=>{
    try{
        res.send(await getSetUnion(req.params.set1,req.params.set2));
    }
    catch(err){
        next(err);
    }
});

app.get('/getSetIntersection/:set1/:set2',async (req, res, next)=>{
    try{
        res.send(await getSetIntersection(req.params.set1,req.params.set2));
    }
    catch(err){
        next(err);
    }
});

app.get('/getSetDiff/:set1/:set2',async (req, res, next)=>{
    try{
        res.send(await getSetDiff(req.params.set1,req.params.set2));
    }
    catch(err){
        next(err);
    }
});

app.listen(8000,()=>console.log('Connected on PORT 8000'));