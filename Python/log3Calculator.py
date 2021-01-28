import math

PI=3.1415926535897932384650288
TERMS = 7

def sine(deg) :
    deg %= 360 # make it less than 360
    rad = deg * PI / 180
    sin = 0
    print(math.sin(rad))
    i=0
    for i in range(TERMS): # That's Taylor series!!
        sin += power(-1, i) * power(rad, 2 * i + 1) / fact(2 * i + 1)
    
    return sin


def cosine(deg) :
    deg %= 360; # make it less than 360
    rad = deg * PI / 180
    cos = 0
    print(math.cos(rad))
    i=0
    for i in range(TERMS) : # That's also Taylor series!!
        cos += power(-1, i) * power(rad, 2 * i) / fact(2 * i)
    
    return cos

def power(base,exp) :
    if(exp < 0):
        if(base == 0):
            return -0; # Error!!
        return 1 / (base * power(base, (-exp) - 1))
    
    if(exp == 0):
        return 1
    if(exp == 1):
        return base
    return base * power(base, exp - 1)


def fact(n) :
    return 1 if n<= 0 else n * fact(n-1)

def fac(num): 
    if (num == 0): 
        return 1; 
  
    # To store factorial of a number 
    fact = 1; 
    for i in range(1, num + 1): 
        fact = fact * i; 
  
    # Return the factorial of a number 
    return fact; 
  
# Function to find tan(x) upto n terms 
def tan(x): 
  
    # To store value of the expansion 
    sum = 0
    terms = 6
    x %= 360; # make it less than 360
    x = x * PI / 180
    for i in range(1, terms + 1): 
  
        # This loops here calculate Bernoulli number 
        # which is further used to get the coefficient 
        # in the expansion of tan x 
        B = 0; 
        Bn = 2 * i; 
        for k in range(Bn + 1): 
            temp = 0; 
            for r in range(0, k + 1): 
                temp = temp + pow(-1, r) * fac(k) * pow(r, Bn) / (fac(r) * fac(k - r)); 
  
            B = B + temp / ((k + 1)); 

        sum = sum + pow(-4, i) * (1 - pow(4, i)) * B * pow(x, 2 * i - 1) / fac(2 * i); 
  
    # Print the value of expansion 
    return("%.9f" %(sum)); 

def arcSin(x): 
    n = 8
    Sum = x 
    e = 2
    o = 1
    p = 1
    for i in range(2, n + 1): 
  
        # The power to which 'x' is raised 
        p += 2
  
        Sum += (o / e) * (pow(x, p) / p) 
  
        # Numerator value 
        o = o * (o + 2) 
  
        # Denominator value 
        e = e * (e + 2) 
    return(round(Sum, 10)) 