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
        console.log('hey');
        x_0 = x_1;
        x_1 = (1 / n)*((n - 1)*x_0 + (num / (x_0 ** (n - 1))));
        if(x_0 == x_1){
            console.log('no');
            var result = {};
            result['result'] = x_1;
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

module.exports = { getVariance,
                   getStandardDeviation,
                   getLinearRegression,
                   computeGCD,
                   computeLcm,
                   sqrt,
                   nthroot,
                   ln,
                   log,
                   antiLog }