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

function sqrt(number) {
    var lo = 0, hi = number;
    while(lo <= hi) {
         var mid = Math.floor((lo + hi) / 2);
         if(mid * mid > number) hi = mid - 1;
         else lo = mid + 1;
    }
    console.log('--->',hi);
    return parseFloat(hi);
}

module.exports = { getVariance,
                   getStandardDeviation }