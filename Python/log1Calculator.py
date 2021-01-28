def ln(x):
    n = 1000.0
    return n * ((x ** (1/n)) - 1)

def log(x, base):
    result = ln(x) / ln(base)
    return result

# program for anti log
def antiLog(a, b):
    c = 1
    for i in range(1,b+1):
        c = c * a
    return c