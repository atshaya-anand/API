function gcd(a, b){
    while(b!=0){
        a = b;
        b = a % b;
    }
    return a;
}

function multiplicative_inverse(e, phi){
    var d = 0;
    var x1 = 0;
    var x2 = 1;
    var y1 = 1;
    var temp_phi = phi;
    var temp1,temp2,x,y;
    
    while(e > 0){
        temp1 = temp_phi/e;
        temp2 = temp_phi - temp1 * e;
        temp_phi = e;
        e = temp2;
        
        x = x2- temp1* x1;
        y = d - temp1 * y1;
        
        x2 = x1;
        x1 = x;
        d = y1;
        y1 = y;

        if(temp_phi == 1)
            return d + phi;
    }
}

function is_prime(num){
    if(num == 2)
        return true
    if(num < 2 || num % 2 == 0)
        return false
    for(var i = 2; i < num; i++){
        if(num % i === 0) 
            return false;
    }
    return true
} 

function egcd(e,r){
    while(r!=0){
        e = r;
        r = e%r;
    }
    return e;
}
    
function eugcd(e,r){
    for(var i=1;i<r;i++){
        while(e!=0){
            a = r/e;
            b = r%e;
            r=e
            e=b
        }
    var res = {};
    res['e'] = e;
    res['r'] = r;
    return res;
    }
}
        
function eea(a,b){
    if(a%b==0){
        var res = {};
        res['a'] = b;
        res['b'] = 0;
        res['c'] = 1;
        return res;
    }
    else{
        var ress = eea(b,a%b);
        var gcd = ress['a'];
        var s = ress['b'];
        var t = ress['c'];
        s = s-((a/b) * t);
        var res = {};
        res['a'] = gcd;
        res['b'] = t;
        res['c'] = s;
        return res;
    }
}
    
function mult_inv(e,r){
        var ress = eea(e,r);
        var gcd = ress['a'];
        var s = ress['b'];
        var t = ress['c'];
        if(gcd!=1){
            return null;
        }
        else{
            return s%r;
        }
}
    
function generate_keypair(p, q){
    var n = p * q;
    var phi = (p-1) * (q-1);
    for(var i=1;i<=1000;i++){
        if(egcd(i,phi)==1)
          var e=i;
    } 
    e = Math.random(1, phi);
    var g = gcd(e, phi);
    while(g != 1){
        e = Math.random(1, phi);
        g = gcd(e, phi);
    }  
    var d = mult_inv(e, phi);
    var res = [[e, n], [d, n]];
    console.log(res);
    return res;
}

function encrypt(pk, plaintext){
    var key = pk[0];
    var n = pk[1];
    var cipher = [];
    for(var i=0;i<plaintext.length;i++){
        plaintext[i] = (plaintext.charCodeAt(plaintext[i]) ** key) % n ;
        cipher.push(plaintext[i]);
    }
    return cipher;
}

function decrypt(pk, ciphertext){
    var key = pk[0];
    var n = pk[1];
    var plain = [];
    for(var i=0;i<ciphertext.length;i++){
        ciphertext[i] = (ciphertext.fromCharCode(ciphertext[i] ** key)) % n ;
        plain.push(ciphertext[i]);
    }
    return ''.join(plain);
}

function getEncrypt(msg){
  var res = generate_keypair(17, 19);
  var public = res[0];
  var private = res[1];
  var encrypted_msg = encrypt(private, msg);
  encrypted_msg = ' '.join(encrypted_msg);
  encrypted_msg = "Encrypted msg is "+encrypted_msg + " and key is "+str(public);
  return({'result':encrypted_msg});
}

function getDecrypt(msg,key){
  data = dict(request.args)
  key = key.split(',');
  for(var i=0;i<key.length;i++){
      key[i] = parseInt(key[i]);
  }
  msg = msg.split(" ");
  for(var i=0;i<msg.length;i++){
    msg[i] = parseInt(msg[i]);
  }
  var decrypted_msg = decrypt(key, msg);
  return({'result':decrypted_msg});
}

module.exports = {getEncrypt , getDecrypt};