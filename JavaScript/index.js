const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const {getSetUnion, getSetIntersection, getSetDiff, dateDiff, getMatTranspose, getLowerDiagonal, getUpperDiagonal,getWord,getCheckSum,generateOTPAlphaNum,generateOTPNum,generateOTPAlpha, barCode} = require('./function.js');
const {getVariance, getStandardDeviation, getLinearRegression, computeGCD, computeLcm, sqrt, nthroot, ln, log, antiLog,sine,cosine,tan,arcSin} = require('./set2-programs');
const { amps, kVA, watt, volts, mAh, wh, joules } = require('./elecCalc.js');

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

app.get('/getnthRoot/:n/:num',async (req, res, next)=>{
    try{
        console.log("dw");
        res.send(await nthroot(req.params.n,req.params.num));
    }
    catch(err){
        next(err);
    }
});

app.get('/getNaturalLog/:num',async (req, res, next)=>{
    try{
        //console.log(req.query,"dw");
        res.send(await ln(req.params.num));
    }
    catch(err){
        next(err);
    }
});

app.get('/getLog/:num/:base',async (req, res, next)=>{
    try{
        //console.log(req.query,"dw");
        res.send(await log(req.params.num,req.params.base));
    }
    catch(err){
        next(err);
    }
});

app.get('/getAntiLog/:num/:pow',async (req, res, next)=>{
    try{
        //console.log(req.query,"dw");
        res.send(await antiLog(req.params.num,req.params.pow));
    }
    catch(err){
        next(err);
    }
});

app.get('/getSine/:num/',async (req, res, next)=>{
    try{
        //console.log(req.query,"dw");
        res.send(await sine(req.params.num));
    }
    catch(err){
        next(err);
    }
});

app.get('/getCosine/:num/',async (req, res, next)=>{
    try{
        //console.log(req.query,"dw");
        res.send(await cosine(req.params.num));
    }
    catch(err){
        next(err);
    }
});

app.get('/getTan/:num/',async (req, res, next)=>{
    try{
        //console.log(req.query,"dw");
        res.send(await tan(req.params.num));
    }
    catch(err){
        next(err);
    }
});

app.get('/getArcSin/:num/',async (req, res, next)=>{
    try{
        //console.log(req.query,"dw");
        res.send(await arcSin(req.params.num));
    }
    catch(err){
        next(err);
    }
});

app.get('/getArcCos/:num/',async (req, res, next)=>{
    try{
        //console.log(req.query,"dw");
        var num = parseFloat(req.params.num);
        if( num>1 || num < -1){
            var result = "Enter number in range of -1 to 1";
            res.send({"result":result});
        }
        else{
            var result = Math.acos(num)
            res.send({"result":result});
        }
    }
    catch(err){
        next(err);
    }
});

app.get('/getArcTan/:num/',async (req, res, next)=>{
    try{
        //console.log(req.query,"dw");
        var num = parseFloat(req.params.num);
        if( num>1 || num < -1){
            var result = "Enter number in range of -1 to 1";
            res.send({"result":result});
        }
        else{
            var result = Math.atan(num)
            res.send({"result":result});
        }
    }
    catch(err){
        next(err);
    }
});

app.get('/getCosec/:num/',async (req, res, next)=>{
    try{
        //console.log(req.query,"dw");
        res.send(await sine(req.params.num,1));
    }
    catch(err){
        next(err);
    }
});

app.get('/getSec/:num/',async (req, res, next)=>{
    try{
        //console.log(req.query,"dw");
        res.send(await cosine(req.params.num,1));
    }
    catch(err){
        next(err);
    }
});

app.get('/getCot/:num/',async (req, res, next)=>{
    try{
        //console.log(req.query,"dw");
        res.send(await tan(req.params.num,1));
    }
    catch(err){
        next(err);
    }
});

app.get('/amps/:pow/:vol',async (req, res, next)=>{
    try{
        res.send(await amps(req.params.pow,req.params.vol));
    }
    catch(err){
        next(err);
    }
});

app.get('/kVA/:cur/:vol',async (req, res, next)=>{
    try{
        res.send(await kVA(req.params.cur,req.params.vol));
    }
    catch(err){
        next(err);
    }
});

app.get('/watt/:cur/:vol',async (req, res, next)=>{
    try{
        res.send(await watt(req.params.cur,req.params.vol));
    }
    catch(err){
        next(err);
    }
});

app.get('/volts/:pow/:cur',async (req, res, next)=>{
    try{
        res.send(await volts(req.params.pow,req.params.cur));
    }
    catch(err){
        next(err);
    }
});

app.get('/joules/:pow/:time',async (req, res, next)=>{
    try{
        res.send(await joules(req.params.pow,req.params.time));
    }
    catch(err){
        next(err);
    }
});

app.get('/mAh/:wh/:vol',async (req, res, next)=>{
    try{
        res.send(await mAh(req.params.wh,req.params.vol));
    }
    catch(err){
        next(err);
    }
});

app.get('/wh/:ah/:vol',async (req, res, next)=>{
    try{
        res.send(await wh(req.params.ah,req.params.vol));
    }
    catch(err){
        next(err);
    }
});

app.get('/barCode/:text/:intWT/:intHT',async (req,res,next)=>{
    try{
        res.send(await barCode(req.params.text,req.params.intWT,req.params.intHT));
    }
    catch(err){
        next(err);
    }
});

app.listen(8001,()=>console.log('Connected on PORT 8000'));