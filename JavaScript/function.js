const {MD5} = require('./md5.js');

var array5bit_A = [ 'f//AAAAAAAAAAAAAAAAAAAA', 'f//AAAAAAAAAAAAAAAAAAAB', 'f//AAAAAAAAAAAAAAEAAAD/', 'f//AAAAAAAAAAAAAAEAAAAA', 'f//AAAAAAAAAQAAAP8AAAAA', 'f//AAAAAAAAAQAAAP8AAAAB', 'f//AAAAAAAAAQAAAAAAAAD/', 'f//AAAAAAAAAQAAAAAAAAAA', 'f//AAABAAAA/wAAAAAAAAAA', 'f//AAABAAAA/wAAAAAAAAAB', 'f//AAABAAAA/wAAAAEAAAD/', 'f//AAABAAAA/wAAAAEAAAAA', 'f//AAABAAAAAAAAAP8AAAAA', 'f//AAABAAAAAAAAAP8AAAAB', 'f//AAABAAAAAAAAAAAAAAD/', 'f//AAABAAAAAAAAAAAAAAAA', 'QD/AAD/AAAAAAAAAAAAAAAA', 'QD/AAD/AAAAAAAAAAAAAAAB', 'QD/AAD/AAAAAAAAAAEAAAD/', 'QD/AAD/AAAAAAAAAAEAAAAA', 'QD/AAD/AAAAAQAAAP8AAAAA', 'QD/AAD/AAAAAQAAAP8AAAAB', 'QD/AAD/AAAAAQAAAAAAAAD/', 'QD/AAD/AAAAAQAAAAAAAAAA', 'QD/AAAAAAAA/wAAAAAAAAAA', 'QD/AAAAAAAA/wAAAAAAAAAB', 'SL/AADeAAAA/gAAAAIAAAD+', 'QD/AAAAAAAA/wAAAAEAAAAA', 'QD/AAAAAAAAAAAAAP8AAAAA', 'QD/AAAAAAAAAAAAAP8AAAAB', 'QD/AAAAAAAAAAAAAAAAAAD/', 'QD/AAAAAAAAAAAAAAAAAAAA'];
var array5bit_B = [ 'US0CAuSD38g', 'UUYCA7QBErs', 'ajEDAm49ReY', 'UUoCA+juogg', 'bjEDAjQrOn0', 'bkoDA3iPVH4', 'ajUDAt82atY', 'UU4CA1nljTg', 'cjEDAghkmFU', 'ckoDA0TA9lY', 'izUEAhrxcbg', 'ck4DAxY8F10', 'bjUDAlvFFR8', 'bk4DAxdhexw', 'ajkDAr7LFAw', 'UVICAyQ+UJI', 'TTECAq7UnEM', 'TUoCA+Jw8kA', 'ZjUDAmZGozo', 'TU4CA7CME0s', 'ajUDAvnk9E4', 'ak4DA7VAmk0', 'ZjkDAtle3bI', 'TVICAxOyzrM', 'STUCAqHeHtM', 'SU4CA+16cNA', 'h6QEAZKdo54', 'SVICA62zYxM', 'RTkCAqx1lb4', 'RVICA/z3WM0', 'QT0CAkdoxRU', 'KFYBA46vJCA'];

// Painstakingly derived gobblety-goop, but essentially the front, back and mid-matter common to all barcode images...
var stringStart = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAQAAADLaIVbAAAANUlEQVQIHQEqANX/A';
var stringMid = 'AAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAA';
var stringEnd = 'AAAAASUVORK5CYII=" style="width:';

function barCode(inputString, intWidth, intHeight){
    'use strict';
    var arraySeq = [], i, intChunks, resultString, intRawmod = inputString.length % 5;
    if (intRawmod > 0) {
            for (i = 0; i < 5 - intRawmod; i += 1) {
                inputString += "0";
            }
        }
    intChunks = inputString.length / 5;

    for (i = 0; i < intChunks; i += 1) {
            arraySeq[i] = parseInt(inputString.substr(i * 5, 5), 2);
        }

        resultString = "";
    for (i = 0; i < arraySeq.length; i += 1) {
            resultString += stringStart + array5bit_A[arraySeq[i]] + stringMid + array5bit_B[arraySeq[i]] + stringEnd + intWidth + 'px;height:' + intHeight + 'px;">';
    }
    return resultString;
    }


function dateDiff(date1, date2) {
    console.log(date1,'-------',date2);
    date1 = date1.split("T");
    date2 = date2.split("T");
    console.log(date1,'-------',date2);
    var date_1 = date1[0];
    var time_1 = date1[1];
    var date_2 = date2[0];
    var time_2 = date2[1];
    time_1 = time_1.split(":");
    time_2 = time_2.split(":");
    var hr_1 = time_1[0];
    var min_1 = time_1[1];
    var hr_2 = time_2[0];
    var min_2 = time_2[1];
    date_1 = date_1.split("-");
    var year_1 = date_1[0];
    var month_1 = date_1[1];
    var day_1 = date_1[2];
    date_2 = date_2.split("-");
    var year_2 = date_2[0];
    var month_2 = date_2[1];
    var day_2 = date_2[2];
    console.log(day_1,month_1,year_1,hr_1,min_1,'--------',day_2,month_2,year_2,hr_2,min_2);

    var startDate = new Date();
    startDate.setFullYear(year_1);
    startDate.setDate(day_1);
    startDate.setMonth(month_1);
    startDate.setHours(hr_1);
    startDate.setMinutes(hr_2);
    startDate.setSeconds("0");
    
    var endDate = new Date();
    endDate.setFullYear(year_2);
    endDate.setDate(day_2);
    endDate.setMonth(month_2);
    endDate.setHours(hr_2);
    endDate.setMinutes(min_2);
    endDate.setSeconds("0");
    console.log(startDate,endDate)
    if (startDate > endDate) {
        var swap = startDate;
        startDate = endDate;
        endDate = swap;
    }
    var startYear = startDate.getFullYear();
    var february = (startYear % 4 === 0 && startYear % 100 !== 0) || startYear % 400 === 0 ? 29 : 28;
    var daysInMonth = [31, february, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    var yearDiff = endDate.getFullYear() - startYear;
    var monthDiff = endDate.getMonth() - startDate.getMonth();
    if (monthDiff < 0) {
        yearDiff--;
        monthDiff += 12;
    }
    var dayDiff = endDate.getDate() - startDate.getDate();
    if (dayDiff < 0) {
        if (monthDiff > 0) {
            monthDiff--;
        } else {
            yearDiff--;
            monthDiff = 11;
        }
        dayDiff += daysInMonth[startDate.getMonth()];
    }

   console.log(yearDiff + 'Y ' + monthDiff + 'M ' + dayDiff + 'D');
    day_diff = dayDiff;
    month_diff = monthDiff;
    year_diff = yearDiff;
    hours_diff = endDate.getHours() - startDate.getHours();
    minutes_diff = endDate.getMinutes() - startDate.getMinutes();
    seconds_diff = endDate.getSeconds() - startDate.getSeconds();
    console.log (day_diff, month_diff, year_diff, hours_diff, minutes_diff, seconds_diff);  
    if (seconds_diff < 0) {
        seconds_diff = 60 + seconds_diff;
        minutes_diff -= 1;
        console.log("1")
    }
    if (minutes_diff < 0) {
        minutes_diff = 60 + minutes_diff;
        hours_diff -= 1;
        console.log("2")
    }
    if (hours_diff < 0) {
        hours_diff = 24 + hours_diff;
        day_diff -= 1;
        console.log("3")
    }
    if (day_diff < 0) {
        month_diff -= 1;
        console.log("4")
        if (month_diff == -1) {
            month_diff = 12;
            year_diff = year_diff - 1;
            if (year_diff % 4 == 0 || year_diff % 100 == 0)
                is_leap = 1;
            else
                is_leap = 0;
        }
        if (month_diff == 4 || month_diff == 6 || month_diff == 9 || month_diff == 11)
            day_diff = 30 - day_diff;
        else if (month_diff == 2 && is_leap == 1)
            day_diff = 29 - day_diff;
        else if (month_diff == 2 && is_leap == 0)
            day_diff = 28 - day_diff;
        else
            day_diff = 31 - day_diff;
    }

    var result = day_diff+' days '+month_diff+' months '+year_diff+" years "+hours_diff+' hours '+minutes_diff+' minutes '+seconds_diff+' seconds.'
    return result; 
}

const getSetUnion = async (seta, setb) => {
    console.log(seta,'----',setb);
    seta = seta.split(',');
    setb = setb.split(',');
    for(var i=0;i<seta.length;i++){
        seta[i] = parseInt(seta[i]);
    }
    for(var i=0;i<setb.length;i++){
        setb[i] = parseInt(setb[i]);
    }
    var result = [];
    for (var i = 0; i < seta.length; i++) {
        result.push(seta[i]);
    }
    for (var i = 0; i < setb.length; i++) {
        if(setb[i] in result){
            continue;
        }else
        result.push(setb[i]);
    }
    return result;
}

const getSetIntersection = async (seta, setb) => {
    console.log(seta,'----',setb);
    seta = seta.split(',');
    setb = setb.split(',');
    for(var i=0;i<seta.length;i++){
        seta[i] = parseInt(seta[i]);
    }
    for(var i=0;i<setb.length;i++){
        setb[i] = parseInt(setb[i]);
    }
    var result = [];
    for (var i = 0; i < seta.length; i++) {
        if(setb.indexOf(seta[i]) != -1){
            result.push(seta[i]);
        }
    }
    return result;
}

const getSetDiff = async (seta, setb) => {
    console.log(seta,'----',setb);
    seta = seta.split(',');
    setb = setb.split(',');
    for(var i=0;i<seta.length;i++){
        seta[i] = parseInt(seta[i]);
    }
    for(var i=0;i<setb.length;i++){
        setb[i] = parseInt(setb[i]);
    }
    var result = [];
    for (var i = 0; i < seta.length; i++) {
        //console.log(setb.indexOf(seta[i]),seta[i],"check");
        if(setb.indexOf(seta[i]) == -1){
            console.log(seta[i]);
            result.push(seta[i]);
        }
    }
    return result;
}

const getMatTranspose = async (row, col, mat) => {
    console.log(row,'------',col,'------',mat);
    rows = parseInt(row);
    col = parseInt(col);
    var strnL = mat.split(",");
    var count = 0;
    var matrixA = [];
    
    for(var i=0;i<row;i++){
        var temp = [];
        for(var j=0;j<row;j++){
            temp.push(parseInt(strnL[count]));
            count = count+1;
        }
        matrixA.push(temp);
    }
    console.log(row,'----',col,'----',matrixA);
    
    var res = ''; 
    for(var i=0;i<row;i++){
        for(var j=0;j<col;j++){
            console.log(matrixA[i][j]);
            res = res + matrixA[i][j] + ' ';
        }
        res = res + '<br/>';
    }
    console.log(res);
    return res;
}

const getLowerDiagonal = async (row, col, mat) => {
    console.log(row,'------',col,'------',mat);
    rows = parseInt(row);
    col = parseInt(col);
    var strnL = mat.split(",");
    var count = 0;
    var matrixA = [];
    
    for(var i=0;i<row;i++){
        var temp = [];
        for(var j=0;j<row;j++){
            temp.push(parseInt(strnL[count]));
            count = count+1;
        }
        matrixA.push(temp);
    }
    console.log(row,'----',col,'----',matrixA);
    
    var lower_left = [];
    var lower_right = [];
    if(row == col){
        for(var i=0;i<row;i++){
            for(var j=0;j<col;j++){
                if(j<i)
                    lower_left.push(matrixA[i][j]);
                if(j>=1 && i+j > col-1)
                    lower_right.push(matrixA[i][j]);
            }
        }
    }
    
    console.log("Left-lower:",lower_left,"\nRight-lower:",lower_right);
    res = "Lower Left Elements: "+lower_left+"<br/>Lower Right Elements: "+lower_right;
    return res;
}

const getUpperDiagonal = async (row, col, mat) => {
    console.log(row,'------',col,'------',mat);
    rows = parseInt(row);
    col = parseInt(col);
    var strnL = mat.split(",");
    var count = 0;
    var matrixA = [];
    
    for(var i=0;i<row;i++){
        var temp = [];
        for(var j=0;j<row;j++){
            temp.push(parseInt(strnL[count]));
            count = count+1;
        }
        matrixA.push(temp);
    }
    console.log(row,'----',col,'----',matrixA);
    
    var upper_left = [];
    var upper_right = [];
    if(row == col){
        for(var i=0;i<row;i++){
            for(var j=0;j<col;j++){
                if(j>i)
                    upper_right.push(matrixA[i][j]);
                if(j<=1 && i+j < col-1)
                    upper_left.push(matrixA[i][j]);
            }
        }
    }
    
    console.log("Left-upper:",upper_left,"\nRight-upper:",upper_right);
    res = "Upper Left Elements: "+upper_left+"<br/>Upper Right Elements: "+upper_right;
    return res;
}

ones = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine']

twos = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen']

tens = ['Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety', 'Hundred']

suffixes = ['', 'Thousand', 'Million', 'Billion']

function process(number, index){
    if (number=='0'){
        return 'Zero';
    }
    
    var length = number.length;
    
    if(length > 3){
        return false;
    }
    
    number = number.padStart(3, '0');//zfill(3);
    var words = '';
 
    var hdigit = parseInt(number[0]);
    var tdigit = parseInt(number[1]);
    var odigit = parseInt(number[2]);
    
    words += number[0] == '0'?'':ones[hdigit];
    words += !(words == '')?' Hundred ': '';
    
    if(tdigit > 1){
        words += tens[tdigit - 2];
        words += ' ';
        words += ones[odigit];
    }
    else if(tdigit == 1){
        words += twos[(parseInt(tdigit + odigit) % 10) - 1];
    }    
    else if(tdigit == 0){
        words += ones[odigit];
    }
    if(words.endsWith('Zero')){
        words = words.slice(0,-4);
    }
    else{
        words += ' ';
    }
    if(!((words.length) == 0)){    
        words += suffixes[index];
    }    
    return words
}
const getWord = async(number)=>{
    //number = "87600";
    var length = String(number).length;
    if (length>12){
        return 'This program supports upto 12 digit numbers.'
    }
    var count = parseInt((length % 3 == 0)?length / 3:length / 3 + 1);
    var copy = count;
    var words = [];
    console.log(count);
    for(var i=length-1;i>-1;){
         console.log(((i - 2 < 0)? 0 : i - 2),(i + 1),(copy - count))
         words.push(process(String(number).slice(((i - 2 < 0)? 0 : i - 2), (i + 1)), (copy - count)));
         count -= 1;
         i=i-3;
    }
    var final_words = '';
    var temp = "";
    var rev_words = words.reverse();
    for(var i=0;i<rev_words.length;i++){
        temp = rev_words[i] + " ";
        final_words += temp;
    }

    return final_words;
}

const getCheckSum = async(str)=>{

    return MD5(str);
}
rnd.today = new Date(); 
rnd.seed = rnd.today.getTime(); 
function rnd() { 
    rnd.seed = ( rnd.seed*9301+49297 ) % 233280; 
    return rnd.seed/ (233280.0); 
} ; 
function rand( number ) { 
    return Math.ceil( rnd () * number ); 
};


const generateOTPAlphaNum = async(size)=>{
    var string1 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var OTP = "" ;
    var length = string1.length;
    for(var i=0;i<size;i++){
        OTP+= string1[Math.floor(rand(length))-1];
    }
    return OTP;
}

const generateOTPAlpha = async(size)=>{
    var string1 = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var OTP = "" ;
    var length = string1.length;
    for(var i=0;i<size;i++){
        OTP+= string1[Math.floor(rand(length))-1];
    }
    return OTP 
}

const generateOTPNum = async(size)=>{
    var string1 = '0123456789';
    var OTP = "" ;
    var length = string1.length;
    for(var i=0;i<size;i++){
        OTP+= string1[Math.floor(rand(length))-1];
    }
    return OTP ;
}

module.exports = { dateDiff,
                   getSetUnion,
                   getSetIntersection,
                   getSetDiff,
                   getMatTranspose,
                   getLowerDiagonal,
                   getUpperDiagonal,
                   getWord,
                   getCheckSum,
                   generateOTPAlphaNum,
                   generateOTPNum,
                   generateOTPAlpha,
                   barCode
                 };