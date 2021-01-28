def computeGCD(x, y): 
   while(y): 
       x, y = y, x % y 
   return x 

def computeLcm(x, y):
   lcm = (x*y)//computeGCD(x,y)
   return lcm

def nthroot (n, A):
    #getcontext().prec = precision
    n = n
    x_0 = A / n #step 1: make a while guess.
    x_1 = 1     #need it to exist before step 2
    while True:
        #step 2:
        x_0, x_1 = x_1, (1 / n)*((n - 1)*x_0 + (A / (x_0 ** (n - 1))))
        print(x_0,x_1)
        x_0 = float("{0:.14f}".format(x_0))
        x_1 = float("{0:.14f}".format(x_1))
        if x_0 == x_1:
            return x_1