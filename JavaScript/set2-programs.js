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

function evaluate_algorithm(dataset){
    var test_set = [];
    for(var i=0;i<dataset.length;i++){
        var row_copy = dataset[i];
        row_copy[-1] = null;
        test_set.push(row_copy);
    }
	var predicted = algorithm(dataset, test_set)
    console.log('Predicted--->',predicted)
    var actual = [];
    for(var i=0;i<dataset.length;i++){
        var row = dataset[i];
        actual[i] = row[-1];
    }
	var rmse = rmse_metric(actual, predicted)
    return rmse;
}

function mean(values){
    return Math.sum(values) / parseFloat(values.length);
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
    return sum(x);
}
 
function coefficients(dataset){
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
    var x_mean = mean(x);
    var y_mean = mean(y);
	var b1 = covariance(x, x_mean, y, y_mean) / variance(x, x_mean);
	var b0 = y_mean - b1 * x_mean
    return [b0, b1];
}

function simple_linear_regression(train, test){
	var predictions = [];
    var b0, b1 = coefficients(train);
    for(var i=0;i<test.length;i++){
        var row = test[i];
        var yhat = b0 + b1 * row[0];
        predictions.push(yhat);
    }
    return predictions;
}

function l(dataset,algorithm){
  var test_set = [];
  for(var i=0;i<dataset.length;i++){
      var row = dataset[i];
      var row_copy = row;
      row_copy[-1] = null;
      test_set.push(row_copy);
  }
  var predicted = simple_linear_regression(dataset,test_set);
  var actual = [];
  for(var i=0;i<dataset.length;i++){
      var row = dataset[i];
      actual[i] = row[-1];
  }
  return actual;
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
    
    var rmse = evaluate_algorithm(dataset, simple_linear_regression);
    console.log(l(dataset, simple_linear_regression));
}

module.exports = { getVariance,
                   getStandardDeviation,
                   getLinearRegression }