function amps(pow,vol){
    pow = parseInt(pow);
    vol = parseInt(vol);
    var res = pow / vol;
    var result = {};
    result['result'] = res;
    return result;
}

function kVA(cur,vol){
    cur = parseInt(cur);
    vol = parseInt(vol);
    var res = (cur * vol)/1000;
    var result = {};
    result['result'] = res;
    return result;
}

function watt(cur,vol){
    cur = parseInt(cur);
    vol = parseInt(vol);
    var res = cur * vol;
    var result = {};
    result['result'] = res;
    return result;
}

function volts(pow,cur){
    pow = parseInt(pow);
    cur = parseInt(cur);
    var res = pow / cur;
    var result = {};
    result['result'] = res;
    return result;
}

function mAh(wh,vol){
    wh = parseInt(wh);
    vol = parseInt(vol);
    var res = (wh*1000) / vol;
    var result = {};
    result['result'] = res;
    return result;
}

function joules(pow,time){
    pow = parseInt(pow);
    time = parseInt(time);
    var res = pow * time;
    var result = {};
    result['result'] = res;
    return result;
}

function wh(ah,vol){
    ah = parseInt(ah);
    vol = parseInt(vol);
    var res = ah * vol;
    var result = {};
    result['result'] = res;
    return result;
}
    
module.exports = {
                   amps,
                   kVA,
                   watt,
                   volts,
                   mAh,
                   joules,
                   wh
                 }