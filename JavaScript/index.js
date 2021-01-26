const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const {getSetUnion, getSetIntersection, getSetDiff, dateDiff, getMatTranspose, getLowerDiagonal, getUpperDiagonal,getWord,getCheckSum,generateOTPAlphaNum,generateOTPNum,generateOTPAlpha} = require('./function.js');
const {getVariance, getStandardDeviation, getLinearRegression, computeGCD, computeLcm, sqrt, cubert, nthroot} = require('./set2-programs');

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

app.get('/getmatTranspose/:row/:col/:mat',async (req, res, next)=>{
    try{
        res.send(await getMatTranspose(req.params.row,req.params.col,req.params.mat));
    }
    catch(err){
        next(err);
    }
});

app.get('/getLowerDiagonal/:row/:col/:mat',async (req, res, next)=>{
    try{
        res.send(await getLowerDiagonal(req.params.row,req.params.col,req.params.mat));
    }
    catch(err){
        next(err);
    }
});

app.get('/getUpperDiagonal/:row/:col/:mat',async (req, res, next)=>{
    try{
        res.send(await getUpperDiagonal(req.params.row,req.params.col,req.params.mat));
    }
    catch(err){
        next(err);
    }
});

app.get('/getWord/:number',async (req, res, next)=>{
    try{
        res.send(await getWord(req.params.number));
    }
    catch(err){
        next(err);
    }
});

app.get('/getCheckSum/:string',async (req, res, next)=>{
    try{
        //console.log(req.query,"dw");
        res.send(await getCheckSum(req.params.string));
    }
    catch(err){
        next(err);
    }
});

app.get('/generateOTPAlphaNum/:size',async (req, res, next)=>{
    try{
        //console.log(req.query,"dw");
        res.send(await generateOTPAlphaNum(req.params.size));
    }
    catch(err){
        next(err);
    }
});

app.get('/generateOTPAlpha/:size',async (req, res, next)=>{
    try{
        //console.log(req.query,"dw");
        res.send(await generateOTPAlpha(req.params.size));
    }
    catch(err){
        next(err);
    }
});

app.get('/generateOTPNum/:size',async (req, res, next)=>{
    try{
        //console.log(req.query,"dw");
        res.send(await generateOTPNum(req.params.size));
    }
    catch(err){
        next(err);
    }
});

app.get('/getVariance/:data',async (req, res, next)=>{
    try{
        //console.log(req.query,"dw");
        res.send(await getVariance(req.params.data));
    }
    catch(err){
        next(err);
    }
});

app.get('/getStandardDeviation/:data',async (req, res, next)=>{
    try{
        //console.log(req.query,"dw");
        res.send(await getStandardDeviation(req.params.data));
    }
    catch(err){
        next(err);
    }
});

app.get('/getLinearRegression/:row/:data',async (req, res, next)=>{
    try{
        //console.log(req.query,"dw");
        res.send(await getLinearRegression(req.params.row,req.params.data));
    }
    catch(err){
        next(err);
    }
});

app.get('/getGCD/:num1/:num2',async (req, res, next)=>{
    try{
        //console.log(req.query,"dw");
        res.send(await computeGCD(req.params.num1,req.params.num2));
    }
    catch(err){
        next(err);
    }
});

app.get('/getLCM/:num1/:num2',async (req, res, next)=>{
    try{
        //console.log(req.query,"dw");
        res.send(await computeLcm(req.params.num1,req.params.num2));
    }
    catch(err){
        next(err);
    }
});

app.get('/getSquareRoot/:num',async (req, res, next)=>{
    try{
        //console.log(req.query,"dw");
        res.send(await sqrt(req.params.num));
    }
    catch(err){
        next(err);
    }
});

app.get('/getCubeRoot/:num',async (req, res, next)=>{
    try{
        //console.log(req.query,"dw");
        res.send(await cubert(req.params.num));
    }
    catch(err){
        next(err);
    }
});

app.get('/getnthRoot/:n/:num',async (req, res, next)=>{
    try{
        //console.log(req.query,"dw");
        res.send(await nthroot(req.params.n,req.params.num));
    }
    catch(err){
        next(err);
    }
});

app.listen(8000,()=>console.log('Connected on PORT 8000'));