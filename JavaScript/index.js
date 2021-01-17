const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const {getDateDifference} = require('./function.js');

app.get('/getDateDiff',async (req, res, next)=>{
    try{
        res.send(await getDateDifference());
    }
    catch(err){
        next(err);
    }
});

app.listen(8000,()=>console.log('Connected on PORT 8000'));