const getVariance = async (data) => {
    console.log('------',data);
    data = data.split(',');
    for(var i=0;i<data.length;i++){
        data[i] = parseInt(data[i]);
    }

    var n = data.length;
    var sum = 0;
    for(var i=0;i<data.length;i++){
        sum += data[i];
    }
    var mean = sum / n ;
    var deviations = [];
    for(var i=0;i<data.length;i++){
        deviations[i] = (data[i] - mean) ** 2;
    }
    var deviation_sum = 0;
    for(var i=0;i<deviations.length;i++){
        deviation_sum += deviations[i];
    }
    var variance = deviation_sum / n ;
    console.log(variance);
    var result = {};
    result['result'] = variance;
    return result;
}

function avg_calc(ls){
    var n = ls.length;
    var mean = 0.0;
    if(n <= 1)
        return ls[0];

    for(var i=0;i<ls.length;i++){
        mean = mean + parseFloat(ls[i]);
    } 
    mean = mean / parseFloat(n);
    return mean;
}

const getStandardDeviation = async (data) => {
    console.log('------',data);
    data = data.split(',');
    for(var i=0;i<data.length;i++){
        data[i] = parseInt(data[i]);
    }
    var result = {};
    
    var n = data.length;
    if(n <= 1){
        result['result']=0.0;
        return result;
    }
    var sd = 0.0;
    var mean = avg_calc(data);
    for(var i=0;i<data.length;i++){
        sd += (parseFloat(data[i]) - mean) ** 2;
    }
    sd = Math.sqrt(sd / parseFloat(n-1));
    result['result'] = sd;
    return result;
}

function rmse_metric(actual, predicted){
    var sum_error = 0.0;
    var prediction_error, sum_error;
    for(var i=0;i<actual.length;i++){
        prediction_error = predicted[i] - actual[i];
        sum_error += (prediction_error ** 2);
    }
	var mean_error = sum_error / parseFloat(actual.length);
    return Math.sqrt(mean_error);
}

/*function evaluate_algorithm(dataset){
    var test_set = [];
    for(var i=0;i<dataset.length;i++){
        var row_copy = dataset[i];
        row_copy[-1] = null;
        test_set.push(row_copy);
    }
	var predicted = simple_linear_regression(dataset, test_set);
    console.log('Predicted--->',predicted)
    var actual = [];
    for(var i=0;i<dataset.length;i++){
        var row = dataset[i];
        actual[i] = row[-1];
    }
	var rmse = rmse_metric(actual, predicted)
    return rmse;
}*/

function mean(values){
    var sum = 0;
    for(var i=0;i<values.length;i++){
        sum += values[i];
    }
    var res = parseFloat(sum / parseFloat(values.length)).toFixed(2);
    console.log('-;;---',res);
    return res;
}
 
function covariance(x, mean_x, y, mean_y){
    var covar = 0.0;
    for(var i=0;i<x.length;i++){
        covar += (x[i] - mean_x) * (y[i] - mean_y)
    }
    return covar;
}
 
function variance(values, mean){
    var x = [];
    for(var i=0;i<values.length;i++){
        x[i] = (values[i]-mean)**2;
    }
    var sum = 0;
    for(var i=0;i<x.length;i++){
        sum += x[i];
    }
    return sum;
}
 
function coefficients(dataset){
    console.log(dataset);
    var x = [];
    for(var i=0;i<dataset.length;i++){
        var row = dataset[i];
        x[i] = row[0];
    }
    var y = [];
    for(var i=0;i<dataset.length;i++){
        var row = dataset[i];
        y[i] = row[1];
    }
    console.log(x,y);
    var x_mean = mean(x);
    console.log(x_mean);
    var y_mean = mean(y);
    console.log(y_mean);
	var b1 = parseFloat(covariance(x, x_mean, y, y_mean) / variance(x, x_mean));
    var b0 = parseFloat(y_mean - b1 * x_mean);
    console.log(b0,b1);
    return [b0, b1];
}

function simple_linear_regression(train, test){
	var predictions = [];
    var b0, b1;
    var res = coefficients(train);
    b0 = res[0];
    b1 = res[1];
    console.log('b0---->',b0,'b1--->',b1);
    for(var i=0;i<test.length;i++){
        var row = test[i];
        var yhat = b0 + b1 * row[0];
        predictions.push(yhat);
    }
    return predictions;
}

function l(dataset){
  var len = dataset.length, copy = new Array(len); // boost in Safari 
  for (var i=0; i<len; ++i){
    copy[i] = dataset[i].slice(0);
  }
  console.log('copy-->',copy);
  var test_set = [];
  for(var i=0;i<dataset.length;i++){
      var row = dataset[i];
      var row_copy = row;
      row_copy[row.length-1] = null;
      test_set.push(row_copy);
  }
  console.log('test-set--->',test_set);
  var predicted = simple_linear_regression(copy,test_set);
  console.log('predicted-->',predicted);
  return predicted;
}

const getLinearRegression = async (row,data) => {
    //console.log('------',data);
    row = parseInt(row);
    var strnL = data.split(",");
    var count = 0;
    var dataset = [];
    
    for(var i=0;i<row;i++){
        var temp = [];
        for(var j=0;j<2;j++){
            temp.push(parseInt(strnL[count]));
            count = count+1;
        }
        dataset.push(temp);
    }
    console.log(row,'----',dataset);
    var result = {};
    
    //var rmse = evaluate_algorithm(dataset);
    result['result'] = l(dataset);
    return result;
}

const computeGCD = async (num1, num2) => {
    num1 = parseInt(num1);
    num2 = parseInt(num2);
    var temp;
    while(num2){
       temp = num1;
       num1 = num2;
       num2 = temp % num2;
    }
    var result = {};
    result['result'] = num1;
   return result;
}

const computeLcm = async (num1, num2) => {
    num1 = parseInt(num1);
    num2 = parseInt(num2);
    var mul = num1 * num2;
    var temp;
    while(num2){
       temp = num1;
       num1 = num2;
       num2 = temp % num2;
    }
    x = num1;
    var lcm = mul/x;
    var result = {};
    result['result'] = lcm;
    return result;
}

const sqrt = async (num) => {
    num = parseInt(num);
    var last_guess= num/2.0;
    var guess;
    while(true){
        guess= (last_guess + num/last_guess)/2;
        if(Math.abs(guess - last_guess) < .000001){
            var result = {};
            result['result'] = guess;
            return result;
        }
        last_guess= guess;
    }
}

const nthroot = async (n,num) => {
    n = parseInt(n);
    num = parseInt(num);
    var x_0 = num / n;
    var x_1 = 1;
    while(true){
        x_0 = x_1;
        x_1 = (1 / n)*((n - 1)*x_0 + (num / (x_0 ** (n - 1))));
        if(x_0 == x_1){
            var result = {};
            result['result'] = x_1;
            console.log(result);
            return result;
        }
    }
}

const ln = async (x) => {
    x = parseInt(x);
    var n = 1000.0;
    var result = {};
    var output =  n * ((x ** (1/n)) - 1);
    result['result'] = output;
    return result;
}

const log = async (x, base) => {
    x = parseInt(x);
    base = parseInt(base);
    var n = 1000.0;
    var result = {};
    var noutput =  n * ((x ** (1/n)) - 1);
    var baseOutput = n * ((base ** (1/n)) - 1);
    var op = noutput / baseOutput;
    result['result'] = op;
    return result;
}

const antiLog = async (a, b) => {
    a = parseInt(a);
    b = parseInt(b);
    var c = 1;
    for (var i = 1; i <= b; i++) {
        c = c * a;
    }
    var result = {};
    result['result'] = c;
    return result;
}   

var PI=3.1415926535897932384650288
var TERMS = 7

function fact(n) {
    return  n<= 0? 1: n * fact(n-1);
}

function power(base,exp) {
    if(exp < 0){
        if(base == 0){
            return -0; // Error!!
        }
        return 1 / (base * power(base, (-exp) - 1))
    }
    if(exp == 0)
        return 1
    if(exp == 1)
        return base
    return base * power(base, exp - 1)
}

function sine(deg,state=0){ 
    var deg = deg % 360 // make it less than 360
    var rad = deg * PI / 180
    var sin = 0
    var i=0
    for(i=0;i<TERMS;i++){ // That's Taylor series!!
        sin = sin + power(-1, i) * power(rad, 2 * i + 1) / fact(2 * i + 1)
    }
    var result = {};
    result['result'] = sin;
    if(state==1){
      result['result'] = 1/result['result'];  
    }
    return result

}

function cosine(deg,state=0) {
    var deg = deg % 360 // make it less than 360
    var rad = deg * PI / 180
    var cos = 0
    var i=0
    for(i=0;i<TERMS;i++){ // That's also Taylor series!!
        cos += power(-1, i) * power(rad, 2 * i) / fact(2 * i)
    }
    var result = {};
    result['result'] = cos;
    if(state==1){
      result['result'] = 1/result['result'];  
    }
    return result
}

function fac(num){
    if (num == 0)
        return 1; 
  
    // To store factorial of a number 
    var fact = 1; 
    for(var i=1;i<=num;i++){ //i in range(1, num + 1): 
        fact = fact * i; 
    }
    // Return the factorial of a number 
    return fact; 
 } 
// Function to find tan(x) upto n terms 
function tan(x,state=1){
  
    // To store value of the expansion 
    var sum = 0
    var terms = 6
    var x = x % 360; // make it less than 360
    x = x * PI / 180
    for(var i=1;i<=terms;i++){// i in range(1, terms + 1): 
  
        // This loops here calculate Bernoulli number 
        // which is further used to get the coefficient 
        // in the expansion of tan x 
        var B = 0; 
        var Bn = 2 * i; 
        for(var k=0;k<=Bn;k++){// k in range(Bn + 1): 
            var temp = 0; 
            for(var r=0;r<=k;r++){// r in range(0, k + 1): 
                temp = temp + Math.pow(-1, r) * fac(k) * Math.pow(r, Bn) / (fac(r) * fac(k - r)); 
            }  
            B = B + temp / ((k + 1)); 
        } 
        sum = sum + Math.pow(-4, i) * (1 - Math.pow(4, i)) * B * Math.pow(x, 2 * i - 1) / fac(2 * i); 
    }
    // Print the value of expansion 
    var result = {};
    result['result'] = sum.toPrecision(9);
    if(state==1){
      result['result'] = 1/result['result'];  
    }
    return result;
}

function arcSin(x){ 
    var n = 8
    var Sum = parseFloat(x)
    var e = 2
    var o = 1
    var p = 1
    for(var i=2;i<=n;i++){// i in range(2, n + 1): 
  
        // The power to which 'x' is raised 
        p += 2
  
        Sum += (o / e) * (Math.pow(x, p) / p) 
  
        // Numerator value 
        o = o * (o + 2) 
  
        // Denominator value 
        e = e * (e + 2) 
        
    }
    console.log(Sum);
    var result = {};
    result['result'] = Sum.toPrecision(9);
    return result; 
}

module.exports = { getVariance,
                   getStandardDeviation,
                   getLinearRegression,
                   computeGCD,
                   computeLcm,
                   sqrt,
                   nthroot,
                   ln,
                   log,
                   antiLog,
                   sine,
                   cosine,
                   tan,
                   arcSin }